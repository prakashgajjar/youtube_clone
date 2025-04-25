import { useNavigate } from "react-router-dom";
import Option from '../components/Options'
import { useState } from "react";


const likedVideos = ({ video, channelName }) => {
    const [showOption, setShowOption] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="">
            <div className=" h-[138px] w-[760px] flex justify-between  ">
                <div className="flex gap-4 ">
                    <div className="h-[138px] min-w-[246px]  bg-red-500 rounded-lg" onClick={() => {
                        navigate(`/video/${video._id}`)
                    }}>
                        <img className="rounded-lg h-[138px] w-[246px]" src={`http://localhost:3000/images/${video.thumbnail}`} alt="thumbnail" />
                    </div>
                    <div className="pt-1 w-[514px]">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-xl font-semibold">{video.tital}</h1>
                            </div>
                            <div className="flex ml-3 flex-col">
                                <div className="flex justify-center w-10 h-10 items-center  " onClick={()=>{
                                    setShowOption(!showOption)
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width="24" height="24" fill="currentColor">
                                        <path d="M64 144c26.5 0 48-21.5 48-48S90.5 48 64 48 16 69.5 16 96s21.5 48 48 48zm0 80c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 176c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" />
                                    </svg>
                                </div>

                                {
                                    showOption && <div className="ml-2 absolute mt-10 cursor-pointer w-48 text-white bg-[#282828] shadow-gray-600 rounded-xl  shadow-sm">
                                        <Option video={video} value={setShowOption} />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <h1 className="text-sm opacity-60">{channelName}</h1>
                            <h1 className="-mt-1">. </h1>
                            <h1 className="text-sm opacity-60">{video.views} views</h1>
                        </div>
                        <div className="mt-2">
                            <h1 className="text-sm opacity-60 overflow-ellipsis line-clamp-2">{video.description} </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default likedVideos