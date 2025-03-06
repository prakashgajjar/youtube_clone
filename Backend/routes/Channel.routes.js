import express from 'express';
import channelData from '../controllers/Channel.controller.js';
import ChannelDetail from '../controllers/GetChannelDetail.controller.js';
import ChannelSubscribe from '../controllers/ChannelSubscribe.controller.js'
import CheackSubscribed from '../controllers/CheackSubscribed.controller.js'

const router = express.Router();
router.post('/create' ,channelData);
router.post('/detail' ,ChannelDetail);
router.post('/subscribe' , ChannelSubscribe);
router.post('/isSubcribed', CheackSubscribed);

export default router;