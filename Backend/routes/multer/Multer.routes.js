import express from 'express';
import fileData from '../../controllers/multer/Multer.controller.js';

const router = express.Router();
router.post('/profile',fileData);

export default router;