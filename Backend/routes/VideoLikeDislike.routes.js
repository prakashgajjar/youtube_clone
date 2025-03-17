import express from 'express';
import VideoLike from '../controllers/VideoLike.controller.js';
import VideoDislike from '../controllers/VideoDIslike.controller.js';
import VideoReport from '../controllers/VideoReport.controller.js';
import VideoThanks from '../controllers/VideoThanks.controller.js';
import checkLike from '../controllers/checkLikeOrDislike.controller.js';
const router = express.Router();

router.post('/like',VideoLike);
router.post('/dislike',VideoDislike);
router.post('/thanks',VideoThanks);
router.post('/report',VideoReport);
router.post('/checkLike',checkLike);

export default router;