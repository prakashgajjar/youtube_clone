import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ShortVideo = ({ video }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-[220px] cursor-pointer"
      onClick={() => navigate(`/video/${video._id}`)}
    >
      <div className="h-[320px] w-full bg-black rounded-xl overflow-hidden relative" >
        <img
          className="h-full w-full object-cover"
          src={`http://localhost:3000/images/${video.thumbnail}`}
          alt="short thumbnail"
        />
      </div>
      <div className="mt-2 px-1">
        <h2 className="text-white text-sm font-semibold truncate">{video.tital}</h2>
        <p className="text-xs text-gray-400">{video.views} views</p>
      </div>
    </div>
  );
};

ShortVideo.propTypes = {
  video: PropTypes.object.isRequired,
};

export default ShortVideo;
