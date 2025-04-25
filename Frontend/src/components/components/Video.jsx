import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Options from "./Options";

const Video = ({ video }) => {

  const navigate = useNavigate();
  const [showOption, setShowOption] = useState(false);

  return (
    <div>
      <div className='w-[392px] h-[342px] text-white'>
        <div className='w-[392px] h-[221px] rounded-xl' onClick={() => {
          navigate(`/video/${video._id}`);
        }}>
          <img src={`http://localhost:3000/images/${video.thumbnail}`} className="w-full h-full rounded-xl" alt="Thumbnail" />
        </div>
        <div id='writed_component' className='flex gap-3 mt-3'>
          <div className='bg-red-400 rounded-full h-10 w-10 '>
            <img className="rounded-full h-10 w-10" src={`http://localhost:3000/banners/${video.channel.profilePicture}`} alt="" onClick={() => {
              navigate(`/channel/${video.channel._id}`)
            }}/>
          </div>
          <div className='-mt-1'>
            <div className='flex gap-2 max-h-14  overflow-hidden'>
              <h2 className='text-white text-[16px] font-sans font-semibold  w-[300px] '>{video.tital}</h2>
              <div className="hover:bg-white hover:bg-opacity-20  w-[30px] cursor-pointer h-[30px] rounded-full flex items-center justify-center" onClick={() => {
                setShowOption(!showOption);
              }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </div>
              {showOption && (
                <div className="absolute ml-[310px] mt-8 w-48 text-white bg-[#282828] shadow-gray-600 rounded-xl  shadow-sm">
                  <Options video={video} value={setShowOption} />
                </div>
              )}

            </div>
            <div onClick={() => {
              navigate(`/channel/${video.channel._id}`)
            }}>
              <p className='text-gray-400 text-sm font-medium mb-1'>{video.channel.channelName}</p>
              <div className='flex gap-2'>
                <h1>{video.views} views</h1>
                <h1 className='-mt-4 text-3xl'>.</h1>
                <h1>{moment(video.createdAt).fromNow()}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video