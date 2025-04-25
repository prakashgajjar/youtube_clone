import Video from "../../models/Video.models.js";
const getVideoDetail = async (req,res)=>{
    const {videoId} = req.body
    try {
        const video = await Video.findById({_id : videoId }).populate('channel')
        if (!video) {
            return res.status(404).json({ message: "Video not found." });
        }
        res.status(200).json(video);
    } catch (error) {
        console.log(error.message);
    }
}

export default getVideoDetail;