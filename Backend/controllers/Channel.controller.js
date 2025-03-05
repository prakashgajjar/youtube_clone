import mongoose from 'mongoose';
import Channel from '../models/Channel.models.js';
const channelData = async (req,res)=>{
 const {channelName  , channelHandle } = req.body;
 console.log(req.body);
 if(!channelName ||!channelHandle){
    return res.status(400).json({message : "Please fill all the fields"})
 }
    try {
        const checkuser = await Channel.findOne({userId: req.user.id})
        if(checkuser){
            return res.status(401).json({message : "You already have a channel"})
        }
        const user = await Channel.findOne({channelName: channelName})
        if(user){
            return res.status(401).json({message : "Channel name already exists"})
        }
        const channelData = await Channel.create({
            channelName: channelName,
            ChannelHandle : channelHandle,
            email : req.user.email, 
            userId : req.user.id,
            createdAt: new Date()
        })
        console.log(channelData);
        if(channelData){
            res.status(201).json({ message : "channel created successfully" , id: channelData._id})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "something went wrong"})
    }
}

export default channelData;