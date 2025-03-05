import Video from '../models/Video.models.js'
const videoData = async (req,res)=>{
    const {tital , description} = req.body;
    const {thumbnail  , video}  = req.files
    console.log(req.files);
    try {
      if(!video){
        return res.status(400).json({message : "Please upload a video"})
      }
      if(!thumbnail){
        return res.status(400).json({message : "Please upload a thumbnail"})
      }
      console.log(video[0].filename , thumbnail[0].filename);
      const newVideo = await Video.create({
        tital,
        description,
        thumbnail: thumbnail[0].filename,
        video: video[0].filename,
        user: req.user.id,
        category : "anime"
    });

    if(newVideo){
        res.status(200).json({message : "Video added successfully" , id : newVideo._id})
      }else{
        res.status(500).send('Server Error');
    }
    } catch (error) { 
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

export default videoData;