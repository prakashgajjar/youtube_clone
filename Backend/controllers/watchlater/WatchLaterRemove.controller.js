import User from "../../models/User.models.js";
const removeWatchLaterVideo = async (req,res)=>{
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "No video ID provided." });
    }
    try {
        const user = await User.findOne({_id:req.user.id})
        if(user.watchLater.includes(id)){
            user.watchLater.remove(id)
            await user.save();
            return res.status(200).json({ message: "successfully video removed" });
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message , error})
    }
}

export default removeWatchLaterVideo;