import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Video = ({ video }) => {

  const addVideoInWatchLater = async (id) => {
    try {
      const responce = await axios.post('http://localhost:3000/watchlater/add',
        {
          id: id
        }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      if (responce.status === 200) {
        console.log(responce.data)
      } else {
        console.error('Error fetching videos', responce.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addVideoReport = async (id) => {
    try {
      const responce = await axios.post('http://localhost:3000/video/report',
        {
          videoId: id
        }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      if (responce.status === 200) {
        console.log(responce.data)
      } else {
        console.error('Error fetching videos', responce.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const navigate = useNavigate();
  const [showOption, setShowOption] = useState(false);

  return (
    <div>
      <div className='w-[392px] h-[342px] text-white'>
        <div className='w-[392px] h-[221px] rounded-xl' onClick={() => {
          navigate(`/${video._id}`);
        }}>
          <img src={`http://localhost:3000/images/${video.thumbnail}`} className="w-full h-full rounded-xl" alt="Thumbnail" />
        </div>
        <div id='writed_component' className='flex gap-3 mt-3'>
          <div className='bg-red-400 rounded-full h-10 w-10 '>
            <img className="rounded-full h-10 w-10" src={`http://localhost:3000/images/${video.channel.profilePicture}`} alt="" />
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
                  <div className="hover:bg-gray-100 hover:bg-opacity-20 px-4 py-2 cursor-pointer text-sm font-medium  rounded-t-lg" onClick={()=>{
                    addVideoInWatchLater(video._id);
                    setShowOption(false);
                  }}>
                    Watch later
                  </div>
                  <div className="hover:bg-gray-100 hover:bg-opacity-20 px-4 py-2 cursor-pointer text-sm font-medium rounded-b-lg" onClick={()=>{
                    addVideoReport(video._id);
                    setShowOption(false);
                  }}>
                    Report
                  </div>
                </div>
              )}

            </div>
            <div>
              <p className='text-gray-400 text-sm'>{video.channel.ChannelHandle}</p>
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