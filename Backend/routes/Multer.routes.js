import express from 'express';
import fileData from '../controllers/Multer.controller.js';

const router = express.Router();
router.post('/profile',fileData);

export default router;