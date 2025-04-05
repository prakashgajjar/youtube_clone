import User from "../models/User.models.js";
const savedVideos = async (req, res) => {

    try {
        const user = await User.findOne({_id: req.user.id}).populate({
            path: "watchLater",
            populate: { path: "channel" } 
        })
        return res.status(200).json({ message: "success", user });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}

export default savedVideos;