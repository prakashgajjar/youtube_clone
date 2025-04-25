
import Channel from '../../models/Channel.models.js'
const channelDetail = async (req,res)=>{

    try {
        const getChanneDetail = await Channel.findOne({userId : req.user.id}).populate('userId')
        if(getChanneDetail){
        return  res.status(201).json({getChanneDetail})
        }else{
          return  res.status(404).json({message : "No channel found"})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "something went wrong"})
    }
}

export default channelDetail;