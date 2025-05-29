import Channel from '../../models/Channel.models.js'

const channelInfo = async (req, res) => {
    const { id } = req.body;
    try {
        const getChannelDetail = await Channel.findOne({_id : id}).populate('userId')
        if(getChannelDetail){
        return  res.status(201).json({getChannelDetail})
        } else{
          return  res.status(404).json({message : "No channel found"})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message : "Server Error"})
    }
 
}

export default channelInfo;