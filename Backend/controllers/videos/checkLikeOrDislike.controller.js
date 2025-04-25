import Video from "../../models/Video.models.js";
const checkLike = async (req,res)=>{
    const {videoId} = req.body;
    console.log(videoId)
    console.log("checkLike")
    try {
        const video = await Video.findOne({_id : videoId})
        if(!video){
            return res.status(404).json({message : "Video not found"})
        }
        if(video.likes.includes(req.user.id)){
            return res.status(200).json({isLiked : true} )
        }
        if(video.dislikes.includes(req.user.id)){
            return res.status(201).json({isDisLiked : true})
        }
        return res.status(203).json({isLiked : false, isDisLiked : false})
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message : "Server Error"})
    }
}

export default checkLike;