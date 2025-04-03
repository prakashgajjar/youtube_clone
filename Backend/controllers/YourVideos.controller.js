import User from '.././models/User.models.js'
const yourVideos = async (req,res)=>{
    try {
        const user = await User.findOne({_id: req.user.id}).populate({
            path: 'videos',
            populate: { path: 'channel' },
        })
        if (!user) return res.status(404).json({ message: 'unauthorized' });
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}

export default yourVideos;