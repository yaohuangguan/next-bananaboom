import withConnect from "../../../../config/db";
import Post from "../../../../models/Post";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const like = await Post.findById(req.query.id);
      res.json(like);
    } catch (error) {
      console.log(error);
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
