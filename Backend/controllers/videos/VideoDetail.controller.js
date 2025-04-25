import Channel from '../../models/Channel.models.js';
import Video from '../../models/Video.models.js'
const videoData = async (req,res)=>{
    const {tital , description , category , videoType , isMakeForKid} = req.body;
    const {thumbnail  , video}  = req.files;
    let isShorts = false ;
    let isForKid = false ;

    if(videoType === 'short'){
      isShorts = true;
    }else{
      isShorts = false;
    }

    if(isMakeForKid === 'yes'){
      isForKid = true;
    }else{
      isForKid = false;
    }

    console.log(req.files);
    try {
      if(!video){
        return res.status(400).json({message : "Please upload a video"})
      }
      if(!thumbnail){
        return res.status(400).json({message : "Please upload a thumbnail"})
      }
      console.log(video[0].filename , thumbnail[0].filename);
      const channel = await Channel.findOne({userId : req.user.id})

      const newVideo = await Video.create({
        tital,
        description,
        thumbnail: thumbnail[0].filename,
        video: video[0].filename,
        user: req.user.id,
        category : category || "anime",
        channel: channel._id,
        isShorts : isShorts,
        isForKid : isForKid
      });

      channel.videos.push(newVideo._id);
      await channel.save();
      console.log(channel)

    if(newVideo){
        res.status(200).json({message : "Video added successfully" , id : newVideo._id})
      }else{
        res.status(500).send('Server Error');
    }
    } catch (error) { 
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

export default videoData;