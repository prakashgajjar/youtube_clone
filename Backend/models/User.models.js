import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String  , required : true },
  profilePicture: { type: String, default: "" },
  subscribers: { type: Number, default: 0 }, 
  subscribedChannels: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Channels the user has subscribed to
  watchHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }], 
  likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  plan: { 
    type: String, 
    enum: ["free", "premium", "ultra_premium"], 
    default: "free" 
  }, 
  subscriptionExpiry: { type: Date, default: null },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel"
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;