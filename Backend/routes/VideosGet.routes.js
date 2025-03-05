import express from 'express';
import GetVideos from '../controllers/GetVideos.controller.js';
const router = express.Router();

router.get('/', GetVideos)

export default router