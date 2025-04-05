import mongoose from "mongoose";

const ChannelChema = mongoose.Schema({
    userId: { type: String , required: true},
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    channelName : {
        type: String,
        required: true
    },
    email : {type : String, required: true},
    ChannelHandle : {
        type: String,
        required: true,
        unique: true
    },
    subscribers: {type: Number , default: 0 , min:0},
    subscribersDetail: [{type : mongoose.Schema.Types.ObjectId , ref : 'User'}], 
    banner : { type: String},
    profilePicture : { type: String , default:'default.jpg'},
    videos : [{type : mongoose.Schema.Types.ObjectId  , ref: "Video" }],
    createdAt: { type: Date, default: Date.now }
})

const Channel = mongoose.model("Channel", ChannelChema);

export default Channel;