import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import dotenv from 'dotenv';

dotenv.config();

// ✅ AWS S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// 🎞️ Different resolutions
const resolutions = [
  { name: '240p', width: 426, height: 240, bitrate: '400k' },
  { name: '360p', width: 640, height: 360, bitrate: '800k' },
  { name: '720p', width: 1280, height: 720, bitrate: '1500k' },
];

const FfmpegUse = async (req, res, next) => {
  try {
    const inputPath = req.files?.video?.[0]?.path;
    const fileName = path.parse(req.files?.video?.[0]?.filename).name;
    const baseOutputDir = path.join('public', 'hls', fileName);

    if (!inputPath) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    if (!fs.existsSync(baseOutputDir)) {
      fs.mkdirSync(baseOutputDir, { recursive: true });
    }

    // Process each resolution
    for (const reso of resolutions) {
      const outputDir = path.join(baseOutputDir, reso.name);
      const playlistPath = path.join(outputDir, 'playlist.m3u8');

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .outputOptions([
            `-vf scale=${reso.width}:${reso.height}`,
            `-b:v ${reso.bitrate}`,
            '-c:a aac',
            '-preset veryfast',
            '-hls_time 10',
            '-hls_list_size 0',
            `-hls_segment_filename ${outputDir}/output%03d.ts`,
            '-f hls',
          ])
          .output(playlistPath)
          .on('end', () => {
            console.log(`✅ ${reso.name} playlist created`);
            resolve();
          })
          .on('error', (err) => {
            console.error(`❌ FFMPEG error for ${reso.name}:`, err);
            reject(err);
          })
          .run();
      });
    }

    // 🧩 Master playlist
    const masterPlaylist = resolutions
      .map(
        (r) =>
          `#EXT-X-STREAM-INF:BANDWIDTH=${parseInt(r.bitrate) * 1000},RESOLUTION=${r.width}x${r.height}\n${r.name}/playlist.m3u8`
      )
      .join('\n');

    fs.writeFileSync(path.join(baseOutputDir, 'master.m3u8'), `#EXTM3U\n${masterPlaylist}`);
    console.log('🎬 Master playlist created!');

    // ☁️ Upload to AWS S3
    await uploadFolderToS3(baseOutputDir, fileName);
    console.log('🚀 Uploaded to S3 successfully!');

    // 🌍 Return final URL
    req.finalPlaylistUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}/master.m3u8`;
    next();
  } catch (error) {
    console.error('🔥 Error in FfmpegUse:', error);
    res.status(500).json({ error: 'Video processing failed' });
  }
};

// 📦 Upload all files/folders to S3 recursively
async function uploadFolderToS3(localFolderPath, s3FolderPath) {
  const items = fs.readdirSync(localFolderPath);
  for (const item of items) {
    const fullPath = path.join(localFolderPath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      await uploadFolderToS3(fullPath, `${s3FolderPath}/${item}`);
    } else {
      const fileStream = fs.createReadStream(fullPath);
      const contentType = getMimeType(item);

      const upload = new Upload({
        client: s3,
        params: {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${s3FolderPath}/${item}`,
          Body: fileStream,
          ContentType: contentType,
        },
      });

      await upload.done();
      console.log(`📤 Uploaded: ${s3FolderPath}/${item}`);
    }
  }
}

// 🎯 Get correct MIME type
function getMimeType(fileName) {
  if (fileName.endsWith('.m3u8')) return 'application/x-mpegURL';
  if (fileName.endsWith('.ts')) return 'video/mp2t';
  return 'application/octet-stream';
}

export default FfmpegUse;
