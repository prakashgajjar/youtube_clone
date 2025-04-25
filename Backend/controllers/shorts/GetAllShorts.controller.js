import Video from "../../models/Video.models.js";
const GetAllShorts = async (req,res)=>{
   try {
    const video = await Video.find({isShorts : true}).populate('channel');
    console.log(video)
    res.status(200).json({Message: "success" , video});
    
   } catch (error) {
    console.error(error.message);
    res.status(500).json({error : error.message , error})
   }
}

export default GetAllShorts;