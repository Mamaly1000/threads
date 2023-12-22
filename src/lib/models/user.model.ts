import mongoose from "mongoose";

const USER = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, default: null },
  bio: { type: String, default: null },
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
  onboarded: { type: Boolean, default: false },
  communities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
});

const User = mongoose.models.User || mongoose.model("User", USER);
export default User;
