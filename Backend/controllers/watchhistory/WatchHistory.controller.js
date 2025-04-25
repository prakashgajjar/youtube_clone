import User from '../../models/User.models.js'
import History from '../../models/History.models.js';

const watchHistory = async (req, res) => {
    const { videoId } = req.body;
    if (!videoId) {
        return res.status(400).json({ message: "Please provide videoId" })
    }
    try {
        const viewed = await History.findOne({ userId: req.user.id , videoId: videoId });
        console.log(viewed);
        if (!viewed) {
            const videoHistory = await History.create({
                userId: req.user.id,
                videoId: videoId,
                watchedAt: new Date()
            })
            const user = await User.findOneAndUpdate({ _id: req.user.id }, { $push: { watchHistory: videoHistory._id } });
            await user.save();
            return res.status(200).json({ "message": "added in watchhistory", user });
        }else{
            viewed.watchedAt = new Date();
            await viewed.save();
            return res.status(200).json({ "message": "updated watch history", viewed });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" })
    }

}

export default watchHistory;