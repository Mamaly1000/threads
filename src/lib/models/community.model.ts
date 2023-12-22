import mongoose from "mongoose";

export const COMMUNITY = new mongoose.Schema({});
const Community =
  mongoose.models.Community || mongoose.model("Community", COMMUNITY);
export default Community;
