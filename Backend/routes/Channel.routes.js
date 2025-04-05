import express from 'express';
import channelData from '../controllers/Channel.controller.js';
import ChannelDetail from '../controllers/GetChannelDetail.controller.js';
import ChannelSubscribe from '../controllers/ChannelSubscribe.controller.js'
import CheackSubscribed from '../controllers/CheackSubscribed.controller.js'
import ChannelInfo from '../controllers/ChannelInfo.controller.js';
import AuthUser from '../middlewares/Auth.middleware.js';

const router = express.Router();
router.post('/create',AuthUser ,channelData);
router.post('/detail',AuthUser ,ChannelDetail);
router.post('/detail/id',ChannelInfo);
router.post('/subscribe' ,AuthUser, ChannelSubscribe);
router.post('/isSubcribed',AuthUser, CheackSubscribed);

export default router;