import mongoose from "mongoose";

 const VideoSchema = new mongoose.Schema({
  tital: { type: String, required: true },
  description: { type: String },
  video: { type: String, required: true },
  thumbnail: { type: String, required: true },
  category: { type: String, required: true },
  channel: {type: mongoose.Schema.Types.ObjectId , ref : "Channel"},
  tags: { type: [String] }, 
  views: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  reports : [{type: mongoose.Schema.Types.ObjectId, ref:'User'}] ,
  user: [{type : mongoose.Schema.Types.ObjectId , ref: "User" }],
  isShorts : {type : Boolean , default : false},
  isForKid : {type: Boolean , default : false},
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Video = mongoose.model("Video", VideoSchema);
export default Video;
