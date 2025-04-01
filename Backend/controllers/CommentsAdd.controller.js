import Comments from "../models/Comment.models.js";
import Video from "../models/Video.models.js"
import Channel from "../models/Channel.models.js";
const commentAdd =  async (req,res) => {
    const {videoId , comment} = req.body;
    console.log(videoId);
    try {
        if(videoId && req.user.id){

            const channel = await Channel.findOne({userId : req.user.id})

            const addComments = await Comments.create({
                videoId:videoId,
                userId:req.user.id,
                comment : comment,
                channel : channel._id,
            })
            console.log(addComments);

            const videoCommentAdd = await Video.findOne({_id:videoId})
            videoCommentAdd.comments.push(addComments._id);

            await videoCommentAdd.save();
            return res.status(200).json({addComments});
        }else{
            res.status(404).json({message : "video data not available"})
        }
        
   } catch (error) {
    console.log(error.message)
    res.status(404).send(error.message);
   }
}

export default commentAdd;