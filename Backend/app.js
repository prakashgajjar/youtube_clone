import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import EventEmitter from "events";

import SignUpRoutes from './routes/SignUp.routes.js';
import MulterFile from './routes/Multer.routes.js';
import ChannelRoutes from './routes/Channel.routes.js';
import VideoRouter from './routes/VideoUpload.routes.js';
import GetVideos from './routes/VideosGet.routes.js';
import VideoLikeDislikeRoutes from './routes/VideoLikeDislike.routes.js'
import CommentsRoter from './routes/Comments.routes.js';
import WatchHistory from './routes/WatchHistory.routes.js';
import YourVideos from './routes/YourVideo.routes.js'
import WatchLater from './routes/WatchLater.routes.js';

import upload from './middlewares/Upload.middleware.js';
import AuthUser from './middlewares/Auth.middleware.js';
import authUser from './middlewares/Auth.middleware.js';
import GetAuthUser from './controllers/GetAuthUser.controller.js';
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
app.use('/channel',AuthUser,ChannelRoutes);
app.use('/videos' , GetVideos);
app.use('/video',AuthUser,VideoLikeDislikeRoutes);
app.use('/comments',CommentsRoter);
app.use('/watch',WatchHistory);
app.use('/studio',YourVideos);
app.use('/watchlater',WatchLater);
app.use('/upload',AuthUser , upload.fields([
    {name : 'video', maxCount :1},
    {name : "thumbnail" , maxCount :1}
]), VideoRouter);

const PORT = process.env.PORT ||5000;
app.listen(PORT , ()=>{
    console.log('Server is running on port ',PORT);
});