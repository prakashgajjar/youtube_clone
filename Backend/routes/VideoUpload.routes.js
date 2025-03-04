import express from 'express';
const router = express.Router();
import VideoData from '../controllers/VideoDetail.controller.js';

router.post('/video',VideoData);

export default router;