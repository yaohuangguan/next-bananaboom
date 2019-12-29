import Post from "../../../models/Post";
import mongoose from "mongoose";
const comment = async (req, res) => {
  if (req.method === "GET") {
    try {
      const response = await Post.find(
        { _id: req.query.id },
        {
          comments: 1
        }
      );
      res.json(response);
    } catch (error) {
      res.status(404).json({ message: "Not found the comments" });
    }
  }
  if (req.method === "POST") {
    const { user, comment, photoUrl } = req.body;
    if (!user)
      return res.status(400).json({ message: "please login to post comments" });
    if (!comment || comment == "")
      return res.status(400).json({ message: "Please say something" });
    const date = new Date();
    const id = mongoose.Types.ObjectId();
    try {
      const response = await Post.updateOne(
        { _id: req.query.id },
        {
          $push: {
            comments: {
              user,
              comment,
              photoUrl,
              date,
              id
            }
          }
        }
      );
      res.json(response);
    } catch (error) {
      res.status(400).json({ message: "Error when creating comments" });
    }
  }
};

export default comment;
