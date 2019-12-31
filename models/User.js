const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  googleId: {
    type: String,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
  },
  displayName: {
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
  },
  photoURL:{
    type:String,
    default:'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png'
  }
});

module.exports = mongoose.models.users|| mongoose.model("users", UserSchema);
