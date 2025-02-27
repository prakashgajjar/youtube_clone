import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String] }, 
  views: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Video = mongoose.model("Video", VideoSchema);
export default Video;
