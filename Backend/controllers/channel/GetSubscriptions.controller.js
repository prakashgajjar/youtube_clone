import User from '../../models/User.models.js'

const subscription = async (req,res)=>{
    try {
        const user = await User.findOne({_id:req.user.id}).populate('subscribedChannels')
        res.status(200).json({message : "Subscribed successfully" , user})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
}

export default subscription;