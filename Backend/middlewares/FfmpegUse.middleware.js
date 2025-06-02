import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

const resolutions = [
  { name: '240p', width: 426, height: 240, bitrate: '400k' },
  { name: '360p', width: 640, height: 360, bitrate: '800k' },
  { name: '720p', width: 1280, height: 720, bitrate: '1500k' },
  { name: '1080p', width: 1920, height: 1080, bitrate: '3000k' }
];

const FfmpegUse = async (req, res, next) => {
  const inputPath = req.files?.video[0]?.path;
  const fileName = path.parse(req.files?.video[0]?.filename).name;
  const baseOutputDir = path.join('public', 'hls', fileName);

  if (!fs.existsSync(baseOutputDir)) fs.mkdirSync(baseOutputDir, { recursive: true });

  let renditionsProcessed = 0;

  for (const reso of resolutions) {
    const outputDir = path.join(baseOutputDir, reso.name);
    const segmentPattern = path.join(outputDir, 'output%03d.ts');
    const playlistPath = path.join(outputDir, 'playlist.m3u8');

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

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
          '-f hls'
        ])
        .output(playlistPath)
        .on('end', () => {
          console.log(`✅ ${reso.name} playlist created`);
          renditionsProcessed++;
          resolve();
        })
        .on('error', (err) => {
          console.error(`FFMPEG error for ${reso.name}:`, err);
          reject(err);
        })
        .run();
    });
  }

  //  Create master playlist (.m3u8)
  const masterPlaylist = resolutions.map(r =>
    `#EXT-X-STREAM-INF:BANDWIDTH=${parseInt(r.bitrate) * 1000},RESOLUTION=${r.width}x${r.height}\n${r.name}/playlist.m3u8`
  ).join('\n');

  fs.writeFileSync(path.join(baseOutputDir, 'master.m3u8'), `#EXTM3U\n${masterPlaylist}`);

  req.finalPlaylistUrl = `/hls/${fileName}/master.m3u8`; // For frontend playback
  console.log('Master playlist created!');
  next();
};

export default FfmpegUse;
