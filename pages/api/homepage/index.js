import Homepage from '../../../models/Homepage'

const homepage = async(req,res) =>{
if(req.method==='GET'){
  try {
    const response = await Homepage.find();
    res.json(response);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}
}

export default homepage