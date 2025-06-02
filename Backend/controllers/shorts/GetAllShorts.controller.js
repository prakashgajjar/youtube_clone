import Video from "../../models/Video.models.js";

const GetAllShorts = async (req, res) => {
  try {

    const video = await Video.find({ isShorts: true })
      .populate("channel") // only select needed fields
      .sort({ createdAt: -1 }) // newest first

    res.status(200).json({
      success: true,
      video,
    });
  } catch (error) {
    console.error("GetAllShorts Error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export default GetAllShorts;
