import express from 'express';
import yourVideos from '../controllers/YourVideos.controller.js';
import authUser from '../middlewares/Auth.middleware.js';
const router = express.Router();

router.get('/video',authUser,yourVideos);

export default router;