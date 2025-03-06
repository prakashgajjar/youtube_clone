import express from 'express';
import GetVideos from '../controllers/GetVideos.controller.js';
import GetVideoDetail from '../controllers/GetVideoDetail.controller.js';
const router = express.Router();

router.get('/', GetVideos);
router.post('/detail' ,GetVideoDetail );

export default router