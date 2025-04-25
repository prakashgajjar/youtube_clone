import Channel from "../../models/Channel.models.js";
import User from "../../models/User.models.js";

const ChannelSubscribe = async (req,res) =>{
    const {channelId} = req.body;
    try {
        const channelData = await Channel.findOne({_id : channelId })
        if(!channelData){
            return res.status(404).json({message : "Channel not found"})
        }
        if(channelData.subscribersDetail.includes(req.user.id)){
          const channelData1 = await Channel.findByIdAndUpdate(
                channelId,
                {
                  $pull: { subscribersDetail: req.user.id },
                  $inc: { subscribers: -1 }
                },
                { new: true }
              );
            await User.findOneAndUpdate({_id:req.user.id}, {$pull :{subscribedChannels:channelData._id}})
            await channelData1.save();
            return res.status(200).json({message : "user unsubcribed this channel" , channelData : channelData1});
        }
        channelData.subscribersDetail.push(req.user.id);
        await User.findOneAndUpdate({_id:req.user.id}, {$push :{subscribedChannels:channelData._id}})
        channelData.subscribers++;
        await channelData.save();
        res.status(200).json({message : "Subscribe successful" , channelData})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : "Server error"})
    }
} 

    export default ChannelSubscribe;