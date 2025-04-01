import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true }, // Associated video
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  channel:{type : mongoose.Schema.Types.ObjectId , ref:"Channel"} ,// Comment author
  comment: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikes : [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  subComments :[{type:mongoose.Schema.Types.ObjectId , ref : "Comment" , }],
  isReply: { type: Boolean, default: false }, // Is this a reply to another comment?
  adminLike : {type : Boolean , default:false},
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
