import mongoose from "mongoose";

const THREAD = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: String },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
});
const Thread = mongoose.models.Thread || mongoose.model("Thread", THREAD);
export default Thread;
