import Video from "../models/Video.models.js";
import Comment from "../models/Comment.models.js";
const getComments = async (req,res)=>{
    const {videoId} = req.body;
    try {
  
    const commentsDetails = await Comment.find({videoId : videoId}).populate('channel')
    res.status(200).json({message : "success" , Comments : commentsDetails});
    
    } catch (error) {
        console.log(error.message);
        res.status(404).json({message : error.message});
    }
}

export default getComments;