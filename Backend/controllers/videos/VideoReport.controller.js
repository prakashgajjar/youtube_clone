import Video from "../../models/Video.models.js";
const VideoReport = async (req,res)=>{
    const {videoId} = req.body;
try {
    const video = await Video.findOne({_id : videoId})
    if(!video){
        return res.status(404).json({message : "Video not found"})
    }
    if(video.reports.includes(req.user.id)){
        return res.status(400).json({message : "You have already reported this video"})
    }
    video.reports.push(req.user.id);
    await video.save();
    return res.status(200).json({message : "Video Reported Successfully"})
} catch (error) {
    console.log(error.message);
    res.status(500).json({message : "Server Error"})
}
}

export default VideoReport;