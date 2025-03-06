import Video from "../models/Video.models.js";
const getVideos = async (req,res)=>{
    
    try {
        const videos = await Video.find({}).populate('channel')
        if (!videos.length) {
            return res.status(404).json({ message: "No videos found." });
        }
        res.status(200).json(videos);
    } catch (error) {
        console.error(error);
    }

}

export default getVideos;