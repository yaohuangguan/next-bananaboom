import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
  name: String,
  _name: String,
  link: String,
  info: String,
  _info: String,
  image: String,
  width: Number,
  height: Number
});

export default mongoose.models.projects ||
  mongoose.model("projects", ProjectSchema);
