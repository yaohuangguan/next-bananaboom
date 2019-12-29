import Resume from "../../models/Resume";

export default async (req,res) => {
  if (req.method === "GET") {
    try {
      const response = await Resume.find();
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === "POST") {
    const { title, _title, info, _info, degree, url } = req.body;
    try {
      const response = new Resume({
        title,
        _title,
        info,
        _info,
        degree,
        url
      });
      const resume = await response.save();

      res.json(resume);
    } catch (error) {
      console.log(error);
    }
  }
};
