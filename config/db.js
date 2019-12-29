import mongoose from "mongoose";
import config from "config";
const MONGO_URI = config.get("mongoURI");

const withConnect = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) return handler(req, res);
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB errored out:", err.message);
    process.exit(1);
  }
  return handler(req, res);
};

export default withConnect;
