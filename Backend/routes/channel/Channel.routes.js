import express from 'express';
import channelData from '../../controllers/channel/Channel.controller.js';
import ChannelDetail from '../../controllers/channel/GetChannelDetail.controller.js';
import ChannelSubscribe from '../../controllers/channel/ChannelSubscribe.controller.js'
import CheackSubscribed from '../../controllers/channel/CheackSubscribed.controller.js'
import ChannelInfo from '../../controllers/channel/ChannelInfo.controller.js';
import uploadBanner from '../../controllers/channel/UploadBanner.controller.js';
import uploadprofile from '../../controllers/channel/UploadProfile1.controller.js'
import AuthUser from '../../middlewares/Auth.middleware.js';
import upload from '../../middlewares/UploadBanner.middleware.js';


const router = express.Router();
router.post('/create',AuthUser ,channelData);
router.post('/detail',AuthUser ,ChannelDetail);
router.post('/detail/id',ChannelInfo);
router.post('/subscribe' ,AuthUser, ChannelSubscribe);
router.post('/isSubcribed',AuthUser, CheackSubscribed);
router.post('/update/banner', AuthUser, upload.single('banner'), uploadBanner);
router.post('/update/profile', AuthUser, upload.single('profile'), uploadprofile);


export default router;