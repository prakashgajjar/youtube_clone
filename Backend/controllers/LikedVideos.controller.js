const likedVideos = (req,res)=>{
    try {
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}

export default likedVideos;