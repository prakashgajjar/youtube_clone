import User from '.././models/User.models.js'

const watchHistory = async (req, res) => {
   
    try {
        if (!req.user.id) {
            return res.status(401).json({ message: "Not authenticated" });
        }   

        const user = await User.findById(req.user.id).populate({
            path: "watchHistory",
            populate: { path: "videoId" ,populate:{
                path: "channel" ,
            }}
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" })
    }

}

export default watchHistory;