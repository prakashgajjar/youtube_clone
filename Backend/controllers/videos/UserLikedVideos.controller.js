import User from '../../models/User.models.js'

const likedVodeos = async (req, res) => {
    try {
        const user = await User.findOne({_id : req.user.id}).populate({
            path: 'likedVideos',
            populate: { path: 'channel' } 
        })
        console.log(user)
        res.status(200).json({ message: "succees" , user})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
}

export default likedVodeos