import withConnect from "../../../config/db";
import Post from "../../../models/Post";
const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const blogs = await Post.find().sort({ likes: -1 });
      res.json(blogs);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  } else if (req.method === "POST") {
    const {
      name,
      info,
      author,
      createdDate,
      likes,
      tags,
      content,
      code,
      code2,
      comment
    } = req.body;
    try {
      const newPost = new Post({
        name,
        info,
        author,
        createdDate,
        likes,
        tags,
        content,
        code,
        code2,
        comment
      });
      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
};

export default withConnect(handler);
