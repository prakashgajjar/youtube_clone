import Video from "../models/Video.models.js";
const VideoLike = async (req,res)=>{
    const {videoId} = req.body
    console.log(videoId)
    try {
    const video = await Video.findOne({_id : videoId})
    if(!video){
        return res.status(404).json({message : 'Video not found'});
    }
    if(!video.likes.includes(req.user.id)){
      video.likes.push(req.user.id);
    }
    else{
      video.likes.pull(req.user.id);
    }
    if(video.dislikes.includes(req.user.id)){
        video.dislikes.pull(req.user.id);
    }

    await video.save();
    return res.status(200).json({message : 'Video Liked or disliked Successfully' , Video});
} catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error');
}
}

export default  VideoLike;