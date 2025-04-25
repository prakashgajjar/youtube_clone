import express from 'express';
import likedVodeos from '../../controllers/videos/UserLikedVideos.controller.js';
import AuthUser from '../../middlewares/Auth.middleware.js';
const router = express.Router();

router.get('/videos',AuthUser,likedVodeos);

export default router