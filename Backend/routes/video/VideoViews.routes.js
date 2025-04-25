import express from 'express'
import addViews from '../../controllers/videos/VideoViewsAdd.controller.js';
const router = express.Router();

router.post('/add',addViews);

export default router;