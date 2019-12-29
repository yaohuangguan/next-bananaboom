import mongoose from "mongoose"

const LogSchema = mongoose.Schema({
  version: String,
  update_date: String,
  info: String
});

export default mongoose.models.logs || mongoose.model("logs", LogSchema);
