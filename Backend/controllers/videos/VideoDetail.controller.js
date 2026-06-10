import Channel from '../../models/Channel.models.js';
import Video from '../../models/Video.models.js';

const videoData = async (req, res) => {
  const { tital, description, category, videoType, isMakeForKid } = req.body;
  const { thumbnail, video } = req.files;

  let isShorts = videoType === 'short';
  let isForKid = isMakeForKid === 'yes';

  try {
    if (!video) return res.status(400).json({ message: "Please upload a video" });
    if (!thumbnail) return res.status(400).json({ message: "Please upload a thumbnail" });

    const channel = await Channel.findOne({ userId: req.user.id });

    // ✅ use the AWS S3 video URL from Ffmpeg middleware
    const videoUrl = req.finalPlaylistUrl;

    // ✅ thumbnail stays local (same as before)
    const thumbnailFileName = thumbnail[0].filename;

    const newVideo = await Video.create({
      tital,
      description,
      thumbnail: thumbnailFileName, // still local file
      video: videoUrl,              // ✅ AWS S3 HLS URL
      user: req.user.id,
      category: category || "anime",
      channel: channel._id,
      isShorts,
      isForKid,
    });

    channel.videos.push(newVideo._id);
    await channel.save();

    return res.status(200).json({
      message: "Video added successfully",
      id: newVideo._id,
      videoUrl,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export default videoData;
