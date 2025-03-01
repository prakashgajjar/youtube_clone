import express from 'express';
import cloudResponce from '../controllers/CloudInary.controller.js';

const router = express.Router();
router.post('/upload',cloudResponce);

export default router;