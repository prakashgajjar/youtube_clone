import Channel from "../models/Channel.models.js";
const CheackSubscribed = async (req,res)=>{
    const {channelId} = req.body;
    try {
        const channelData = await Channel.findOne({_id : channelId})
        console.log(channelData);
        
        if(!channelData){
            return res.status(404).json({message : "Channel not found"})
        }
        if(channelData.subscribersDetail.includes(req.user.id)){
            console.log("chennal subscribed")
            return  res.status(200).json({message : "Subscribed"});
        }
        else{
            console.log("chennal not subscribed")
            return res.status(400).json({message : "Not subscribed"});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
    
}

export default CheackSubscribed;