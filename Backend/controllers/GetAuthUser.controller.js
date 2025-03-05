import mongoose from 'mongoose';
import User from '../models/User.models.js'
const GetAuthUser = async (req,res)=>{
    const user = await User.findOne({_id : req.user.id})
    res.status(200).json({user});
}

export default GetAuthUser;