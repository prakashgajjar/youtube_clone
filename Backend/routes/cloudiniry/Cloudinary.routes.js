import express from 'express';
import cloudResponce from '../../controllers/cloudinary/CloudInary.controller.js';

const router = express.Router();
router.post('/upload',cloudResponce);

export default router;