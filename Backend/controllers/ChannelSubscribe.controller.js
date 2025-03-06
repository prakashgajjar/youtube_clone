import Channel from "../models/Channel.models.js";

const ChannelSubscribe = async (req,res) =>{
    const {channelId} = req.body;
    console.log(req.user.id)
    console.log(channelId);
    try {
        const channelData = await Channel.findOne({_id : channelId })
        
        console.log(channelData)
        if(!channelData){
            return res.status(404).json({message : "Channel not found"})
        }
        if(channelData.subscribersDetail.includes(req.user.id)){
            return res.status(400).json({message : "You have already subscribed to this channel"})
        }
        channelData.subscribersDetail.push(req.user.id);
        channelData.subscribers++;
        await channelData.save();

        res.status(200).json({message : "Subscribe successful"})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : "Server error"})
    }
} 

    export default ChannelSubscribe;