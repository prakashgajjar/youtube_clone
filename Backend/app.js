import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import EventEmitter from "events";

import SignUpRoutes from './routes/auth/SignUp.routes.js';
import MulterFile from './routes/multer/Multer.routes.js';
import ChannelRoutes from './routes/channel/Channel.routes.js';
import VideoRouter from './routes/video/VideoUpload.routes.js';
import GetVideos from './routes/video/VideosGet.routes.js';
import VideoLikeDislikeRoutes from './routes/video/VideoLikeDislike.routes.js'
import CommentsRoter from './routes/comments/Comments.routes.js';
import WatchHistory from './routes/watch/WatchHistory.routes.js';
import YourVideos from './routes/watch/YourVideo.routes.js'
import WatchLater from './routes/watch/WatchLater.routes.js';
import VideoViews from './routes/video/VideoViews.routes.js'
import LikedVideos from './routes/video/LikedVideos.routes.js'
import SubscriptionsRoter from './routes/video/Subscription.route.js';
import SearchVideo from './routes/video/SearchVideos.routes.js'
import Shorts from './routes/shorts/Shorts.routes.js'

import upload from './middlewares/Upload.middleware.js';
import AuthUser from './middlewares/Auth.middleware.js';
import FfmpegUse from './middlewares/FfmpegUse.middleware.js';
import GetAuthUser from './controllers/auth/GetAuthUser.controller.js';
import mongooseConnection from './configs/connectDB.js';
EventEmitter.defaultMaxListeners = 20;

const app = express();
configDotenv();
mongooseConnection();


app.use(cookieParser());
app.use(express.json());
app.use(express.static('public/images'));
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
}));

app.use(express.static('public'));


app.use('/api',SignUpRoutes);
app.use('/auth' ,AuthUser , GetAuthUser);
app.use('/file' , AuthUser , upload.array('profilePic' ,2),MulterFile);
app.use('/channel',ChannelRoutes);
app.use('/videos' , GetVideos);
app.use('/video',AuthUser,VideoLikeDislikeRoutes);
app.use('/shorts',Shorts)
app.use('/comments',CommentsRoter);
app.use('/watch',WatchHistory);
app.use('/views',VideoViews);
app.use('/studio',YourVideos);
app.use('/watchlater',WatchLater);
app.use('/liked',LikedVideos);
app.use('/subscriptions',SubscriptionsRoter);
app.use('/results',SearchVideo);
app.use('/upload',AuthUser , upload.fields([
    {name : 'video', maxCount :1},
    {name : "thumbnail" , maxCount :1}
]),FfmpegUse, VideoRouter);

const PORT = process.env.PORT ||5000;
app.listen(PORT , ()=>{
    console.log('Server is running on port ',PORT);
});