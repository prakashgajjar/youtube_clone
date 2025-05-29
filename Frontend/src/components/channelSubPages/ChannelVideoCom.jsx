import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";


const YourVideo = ({ video, channel }) => {
    const navigate = useNavigate();
    YourVideo.propTypes = {
        video: PropTypes.object.isRequired,
        channel: PropTypes.object
    };
    return (
        <div className="">
            <div className=" h-[188px] w-[336px] flex justify-between  ">
                <div className="flex gap-4 flex-col ">
                    <div className="h-[188px] w-[336px]  bg-red-500 rounded-lg cursor-pointer" onClick={() => {
                        navigate(`/video/${video._id}`)
                    }}>
                        <img className="rounded-lg h-[188px] min-w-[336px]" src={`http://localhost:3000/images/${video.thumbnail}`} alt="thumbnail" />
                    </div>
                    <div className=" w-[514px]">
                        <div className="flex justify-between cursor-pointer w-[336px]">
                            <div onClick={() => {
                                navigate(`/video/${video._id}`)
                            }}>
                                <h1 className="text-[16px] font-semibold">{video.tital}</h1>
                            </div>
                        </div>
                        <div className="cursor-pointer" onClick={() => {
                            navigate(`/channel/${channel._id}`)
                        }}>
                            <div className="flex gap-1 cursor-pointer mt-1" >
                                <h1 className="text-sm opacity-60">{video.views} views</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default YourVideo