import Project from '../../models/Project'

const projects = async (req, res) => {
  try {
    const response = await Project.find();
    res.json(response);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}
export default projects