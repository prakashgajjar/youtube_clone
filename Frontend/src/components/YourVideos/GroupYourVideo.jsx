import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import YourVideo from "./YourVideo";

const GroupYourVideo = () => {
  const location = useLocation();
  const getYourVideo = async () => {
    try {

      const responce = await axios.get('http://localhost:3000/studio/video', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(responce.data.channel[0]);
      if (responce.status == 200) {
        setYourVideos(responce.data.channel[0].videos)
        setChannelName(responce.data.channel[0].channelName)
        setId(responce.data._id);
      } else {
        console.log("Error getting history video");
      }
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    if (location.pathname === '/myvideos') {
      getYourVideo();
    }
  }, [location.pathname])
  const navigate = useNavigate();
  const [yourVideos, setYourVideos] = useState([])
  const [channelName , setChannelName] = useState();
  const [id, setId] = useState('');
  return (
    <div className="overflow-y-auto h-screen w-screen custom-scroll">
      <div className="ml-48 ">
        <div className="pt-4">
          <h1 className="text-4xl font-bold">My Videos</h1>
        </div>
        <div className="mt-8 gap-3 flex flex-col ">
          {yourVideos && yourVideos.map((video, index) => (
            <div key={index} className="last:pb-[76px]" onClick={()=>{
              navigate(`/${video._id}`)
            }}>
              <YourVideo  video={video} channelName={channelName} hId={id} />
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default GroupYourVideo