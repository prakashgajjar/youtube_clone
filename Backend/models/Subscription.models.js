import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  subscriber: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who subscribed
  channel: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Channel subscribed to
}, { timestamps: true });

const Subscription = mongoose.model("Subscription", SubscriptionSchema);
export default Subscription;
