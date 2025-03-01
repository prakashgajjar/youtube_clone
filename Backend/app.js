import express from 'express';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { configDotenv } from 'dotenv';
import mongooseConnection from './configs/connectDB.js';
import SignUpRoutes from './routes/SignUp.routes.js';
import CloudinaryRoutes from './routes/Cloudinary.routes.js';
import MulterFile from './routes/Multer.routes.js';
import fileUpload from 'express-fileupload';
import upload from './middlewares/Upload.middleware.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import EventEmitter from "events";
EventEmitter.defaultMaxListeners = 20;

const app = express();
configDotenv();
mongooseConnection();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5174'],
    credentials: true,
}));
// app.use(fileUpload({
//     useTempFiles: true,
// })); 
app.use(express.static('public'));

app.use('/api',SignUpRoutes);
// app.use('/cloud' ,CloudinaryRoutes );
app.use('/file' , upload.single('profilePic'),MulterFile);


const uploadDir = 'public/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


const PORT = process.env.PORT ||5000;
app.listen(PORT , ()=>{
    console.log('Server is running on port ',PORT);
});