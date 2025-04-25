import User from "../../models/User.models.js";
const savedVideos = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "No video ID provided." });
    }
    try {
        const user = await User.findOne({_id:req.user.id})
        if(user.watchLater.includes(id)){
            user.watchLater.splice(user.watchLater.indexOf(id), 1);
            user.watchLater.unshift(id);
            await user.save();
            return res.status(200).json({ message: "success video on 1 index", user });
        }else{
            user.watchLater.push(id);
            await user.save();
            return res.status(200).json({ message: "success", user });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}

export default savedVideos;