import User from "../models/User.models.js";
const savedVideos = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "No video ID provided." });
    }
    try {
        const user = await User.findOneAndUpdate({_id:req.user.id},{$push:{watchLater: id}})
        return res.status(200).json({ message: "success", user });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}

export default savedVideos;