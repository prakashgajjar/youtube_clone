import express from 'express';
import VideoLike from '../../controllers/videos/VideoLike.controller.js';
import VideoDislike from '../../controllers/videos/VideoDIslike.controller.js';
import VideoReport from '../../controllers/videos/VideoReport.controller.js';
import VideoThanks from '../../controllers/videos/VideoThanks.controller.js';
import checkLike from '../../controllers/videos/checkLikeOrDislike.controller.js';
const router = express.Router();

router.post('/like',VideoLike);
router.post('/dislike',VideoDislike);
router.post('/thanks',VideoThanks);
router.post('/report',VideoReport);
router.post('/checkLike',checkLike);

export default router;