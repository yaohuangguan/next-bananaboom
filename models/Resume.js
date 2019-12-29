import mongoose from "mongoose";
const ResumeSchema = mongoose.Schema({
  title: {
    type: String
  },
  _title: {
    type: String
  },
  info: {
    type: String
  },
  _info: {
    type: String
  },
  degree: {
    type: String
  },
  url: {
    type: String
  }
});

export default mongoose.models.resumes ||
  mongoose.model("resumes", ResumeSchema);
