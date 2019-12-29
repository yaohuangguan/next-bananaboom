import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.models.users|| mongoose.model("users", UserSchema);
