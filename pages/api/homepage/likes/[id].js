import Homepage from '../../../../models/Homepage';
import withConnect from '../../../../config/db'
const likes = async (req, res) => {
  if (req.method === "POST") {
    try {
      const response = await Homepage.updateOne(
        { _id: req.query.id },
        {
          $inc: {
            likes: 1
          }
        }
      );
      res.json(response);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  } else if (req.method === "PUT") {
    try {
      const response = await Homepage.updateOne(
        { _id: req.query.id },
        { $inc: { likes: -1 } }
      );
      res.json(response);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }
};

export default withConnect(likes);
