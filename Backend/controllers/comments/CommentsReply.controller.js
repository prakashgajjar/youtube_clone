import Comments from "../../models/Comment.models.js";
import Channel from "../../models/Channel.models.js";
import Video from "../../models/Video.models.js";

const reply = async (req, res) => {
    const {videoId , comment , id} = req.body;
    console.log(videoId);
    try {
        if(videoId && req.user.id){

            const channel = await Channel.findOne({userId : req.user.id})

            const addComments = await Comments.create({
                videoId:videoId,
                userId:req.user.id,
                comment : comment,
                channel : channel._id,
                isReply:true
            })

            const parentComment = await Comments.findById(id)
            parentComment.subComments.push(addComments._id);
            await parentComment.save();

            const videoCommentAdd = await Video.findOne({_id:videoId})
            videoCommentAdd.comments.push(addComments._id);

            await videoCommentAdd.save();
            return res.status(200).json({addComments});
        }else{
            res.status(404).json({message : "video data not available"})
        }
}catch(error){
    console.log(error.message)
    res.status(500).send('Server Error');
}
}

export default reply;