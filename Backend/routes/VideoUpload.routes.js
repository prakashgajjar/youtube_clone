import express from 'express';
import VideoData from '../controllers/VideoDetail.controller.js';
const router = express.Router();

router.post('/video',VideoData);

export default router;