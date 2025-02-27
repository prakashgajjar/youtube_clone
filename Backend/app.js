import express from 'express';
import mongooseConnection from './configs/connectDB.js';
import { configDotenv } from 'dotenv';
import SignUpRoutes from './routes/SignUp.routes.js';
import cookieParser from 'cookie-parser';
import EventEmitter from "events";
EventEmitter.defaultMaxListeners = 20;

const app = express();
configDotenv();
mongooseConnection();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',SignUpRoutes);

const PORT = process.env.PORT ||5000;
app.listen(PORT , ()=>{
    console.log('Server is running on port ',PORT);
});