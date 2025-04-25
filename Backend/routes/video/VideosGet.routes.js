import express from 'express';
import GetVideos from '../../controllers/videos/GetVideos.controller.js';
import GetVideoDetail from '../../controllers/videos/GetVideoDetail.controller.js';
import getFeedVideos from '../../controllers/videos/VideoFeed.controller.js';
import AuthUser from '../../middlewares/Auth.middleware.js';

const router = express.Router();

router.get('/', GetVideos);
router.post('/detail' ,GetVideoDetail );
router.get('/feed' , AuthUser,getFeedVideos);

export default router