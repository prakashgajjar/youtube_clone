const videoData = (req,res)=>{
    console.log(req.body);
    console.log(req.file);
    res.status(201).json({message : "Video added successfully"})
}

export default videoData;