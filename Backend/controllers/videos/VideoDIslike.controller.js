import Video from "../../models/Video.models.js";
import User from "../../models/User.models.js";

const VideoDislike = async (req,res)=>{
    const {videoId} = req.body
    try {
    const video = await Video.findOne({_id : videoId})
    if(!video){
        return res.status(404).json({message : 'Video not found'});
    }
    
    if(!video.dislikes.includes(req.user.id)){
      video.dislikes.push(req.user.id);
      await User.findOneAndUpdate({_id:req.user.id},{$pull:{likedVideos : video._id}})
    }
    else{
      video.dislikes.pull(req.user.id);
    }
    if(video.likes.includes(req.user.id)){
        video.likes.pull(req.user.id);
    }

    await video.save();
    return res.status(200).json({message : 'Video Liked or disliked Successfully' , Video});
} catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error');
}
}

export default VideoDislike;