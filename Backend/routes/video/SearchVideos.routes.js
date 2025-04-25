import express from 'express';
import SearchVideo from '../../controllers/videos/SearchVideos.controller.js';
const router  = express.Router();

router.get('/search',SearchVideo);

export default router;