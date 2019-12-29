import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  likes: {
    type: Number
  },
  tags: {
    type: Array
  },
  comments: {
    type: Array,
    id: {
      required: true,
      type: mongoose.Schema.Types.ObjectId
    },
    user: String,
    comment: String,
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    photoUrl: String
  },
  content: {
    type: String
  },
  code: {
    type: String
  },
  code2: {
    type: String
  },
  url: {
    type: String
  }
});

export default mongoose.models.posts || mongoose.model("posts", PostSchema);
