import Video from "../../models/Video.models.js";
const searchVideo = async (req, res) => {
  const search = req.query.query;
  try {
    const words = search.split(' ').filter(word => word.trim() !== '');

    const regexQueries = words.flatMap(word => [
      { tital: { $regex: word, $options: 'i' } },
      { description: { $regex: word, $options: 'i' } },
      { category: { $regex: word, $options: 'i' } },
      { channelName: { $regex: word, $options: 'i' } },
      { ChannelHandle: { $regex: word, $options: 'i' } },
    ]);
    
    const videos = await Video.find({
      $or: regexQueries
    }).populate('channel');
    
    console.log(videos)
    res.status(200).json({ message: "success", videos })
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

export default searchVideo;