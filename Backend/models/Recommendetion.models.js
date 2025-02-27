import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recommendedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }]
}, { timestamps: true });

const Recommendation = mongoose.model("Recommendation", RecommendationSchema);
export default Recommendation;
