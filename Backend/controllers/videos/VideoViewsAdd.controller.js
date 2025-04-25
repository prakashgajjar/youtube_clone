import Video from "../../models/Video.models.js";
const addViews = async (req,res)=>{
    const {videoId} = req.body;

    if(!videoId){
        res.status(400).json({message : "video not found"})
    }

    try {
        const video = await Video.findOneAndUpdate({_id:videoId} , {$inc : {views : 1}})
        await video.save();
        res.status(200).json({message: "Views added successfully" , video});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

export default addViews;