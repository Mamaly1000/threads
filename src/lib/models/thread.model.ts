import mongoose from "mongoose";
import { date } from "zod";

export const THREAD = new mongoose.Schema({
  text: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "COMMUNITY",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: { type: String },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "THREAD" }],
});
const Thread = mongoose.models.Thread || mongoose.model("Thread", THREAD);
export default Thread;
