import mongoose from "mongoose";

const ChannelChema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    channelName : {
        type: String,
        required: true
    },
    ChannelHandle : {
        type: String,
        required: true,
        unique: true
    },
    channelPicture : { type: String, required: true}
})

const Channel = mongoose.model("Channel", ChannelChema);

export default Channel;