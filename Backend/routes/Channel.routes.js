import express from 'express';
import channelData from '../controllers/Channel.controller.js';
import ChannelDetail from '../controllers/GetChannelDetail.controller.js';
const router = express.Router();
router.post('/create' ,channelData);
router.post('/detail' ,ChannelDetail);

export default router;