import Video from "../../models/Video.models.js";
import User from "../../models/User.models.js"
const getFeedVideos = async (req,res)=>{    
    try {
        const user = await User.findById(req.user.id).populate("subscribedChannels");

        let allVideos = [];
    
        for (const channel of user.subscribedChannels) {
          const videos = await Video.find({ channel: channel._id })
            .sort({ createdAt: -1 })
            .or([{ isShorts: false },
              { isShorts: { $exists: false } }])
            .limit(3) // latest 2-3 videos
            .populate("channel", "channelName profilePicture");
    
          allVideos.push(...videos);
        }
    
        // sort all videos by latest (mixed from all channels)
        allVideos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
        if (!allVideos.length) {
            return res.status(404).json({ message: "No videos found." });
        }
        return res.status(200).json(allVideos);
    } catch (error) {
        console.error(error);
    }

}

export default getFeedVideos;