import Homepage from '../../../../models/Homepage'

const likes = async(req,res) =>{
  if(req.method === 'GET'){
    try {
      const response = await Homepage.find({}, { likes: 1 });
      res.json(response);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }
}

export default likes