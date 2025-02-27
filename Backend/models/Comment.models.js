import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true }, // Associated video
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Comment author
  text: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked the comment
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
