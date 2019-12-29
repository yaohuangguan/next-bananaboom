import withConnect from "../../../config/db";
import Post from "../../../models/Post";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const response = await Post.find({ _id: req.query.id });
      res.json(response);
    } catch (error) {
      res.status(404).json({ message: "Not found the posts" });
    }
  } else if (req.method === "POST") {
    try {
      const response = await Post.updateOne(
        { _id: req.query.id },
        { $inc: { likes: 1 } }
      );
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === "PUT") {
    try {
      const response = await Post.updateOne(
        { _id: req.query.id },
        { $inc: { likes: -1 } }
      );
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  }
};

export default withConnect(handler);
