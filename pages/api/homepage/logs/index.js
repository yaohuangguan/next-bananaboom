import Log from "../../../../models/Log";

const logs = async (req, res) => {
  try {
    const response = await Log.find();
    res.json(response);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export default logs;
