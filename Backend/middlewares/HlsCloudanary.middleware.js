import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs/promises';
import os from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';
import dotenv from 'dotenv';
dotenv.config();
import streamifier from 'streamifier';


const execAsync = promisify(exec);

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer memory storage for both video and thumbnail
const upload = multer({ storage: multer.memoryStorage() });

const HlsAndThumbnailUpload = [
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),

  async (req, res, next) => {
    try {
      // --- Handle Thumbnail Upload ---
      if (!req.files?.thumbnail || req.files.thumbnail.length === 0) {
        return res.status(400).json({ error: 'Thumbnail is required!' });
      }
      // Upload thumbnail buffer directly to Cloudinary
      const thumbBuffer = req.files.thumbnail[0].buffer;
      const thumbUploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'thumbnails' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(thumbBuffer).pipe(uploadStream);
      });

      // --- Handle Video (HLS conversion + upload) ---
      if (!req.files?.video || req.files.video.length === 0) {
        return res.status(400).json({ error: 'Video is required!' });
      }
      const videoBuffer = req.files.video[0].buffer;

      // Save video temporarily for ffmpeg input
      const tempInputPath = path.join(os.tmpdir(), `${Date.now()}.mp4`);
      await fs.writeFile(tempInputPath, videoBuffer);

      // Create temp output folder for HLS files
      const tempOutputDir = path.join(os.tmpdir(), `hls-${Date.now()}`);
      await fs.mkdir(tempOutputDir, { recursive: true });

      const masterPath = path.join(tempOutputDir, 'master.m3u8');

      // ffmpeg command to convert video to HLS
      const ffmpegCommand = `
        ffmpeg -i "${tempInputPath}" \
        -c:a aac -ar 48000 -c:v h264 -profile:v baseline -crf 20 -sc_threshold 0 \
        -g 48 -keyint_min 48 -hls_time 10 -hls_list_size 0 \
        -hls_segment_filename "${tempOutputDir}/segment_%03d.ts" \
        -f hls "${masterPath}"
      `;

      await execAsync(ffmpegCommand);

      // Upload all HLS files to Cloudinary
      const files = await fs.readdir(tempOutputDir);
      const uploadedHlsFiles = [];

      for (const file of files) {
        const filePath = path.join(tempOutputDir, file);
        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: 'raw',
          folder: 'hls_videos/' + Date.now()
        });

        uploadedHlsFiles.push({
          filename: file,
          url: result.secure_url
        });
      }

      // Cleanup temporary files & folders
      await fs.unlink(tempInputPath);
      await Promise.all(files.map(f => fs.unlink(path.join(tempOutputDir, f))));
      await fs.rmdir(tempOutputDir);

      // Pass results to next middleware or route handler
      req.thumbnailUrl = thumbUploadResult.secure_url;
      req.hlsFiles = uploadedHlsFiles;

      next();

    } catch (error) {
      console.error('❌ Upload failed:', error);
      res.status(500).json({ error: 'Something went wrong during upload and processing.' });
    }
  }
];

export default HlsAndThumbnailUpload;
