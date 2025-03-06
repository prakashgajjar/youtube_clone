
import mongoose from 'mongoose';
import Channel from '../models/Channel.models.js'
const channelDetail = async (req,res)=>{
    // console.log(req.body);
const {userId  , userEmail} = req.body;
    try {
        const getChanneDetail = await Channel.findOne({userId : req.user.id})
        if(getChanneDetail){
            res.status(201).json({getChanneDetail})
        }else{
            res.status(404).json({message : "No channel found"})
        }
    } catch (error) {
        console.log(error.message);
    }

}

export default channelDetail;