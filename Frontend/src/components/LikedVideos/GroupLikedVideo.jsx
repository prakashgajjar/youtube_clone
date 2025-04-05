import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LikedVideos from "./LikedVideos";
import moment from "moment";

const GroupLikedVideos = () => {
  const location = useLocation();
  const getLikedVideo = async () => {
    try {

      const responce = await axios.get('http://localhost:3000/liked/videos', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(responce);
      if (responce.status == 200) {
        setYourVideos(responce.data.user.likedVideos)
      } else {
        console.log("Error getting history video");
      }
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    if (location.pathname === '/likedvideos') {
      getLikedVideo();
    }
  }, [location.pathname])
  const navigate = useNavigate();
  const [yourVideos, setYourVideos] = useState([])
  return (
    yourVideos.length > 0 && <div className="flex w-screen h-screen gap-8">
      <div className="h-[895px] mt-8 w-96 bg-gradient-to-b from-red-800  to-transparent flex justify-center items-center   rounded-t-2xl">
        <div className="flex flex-col justify-start  w-[312px] h-[839px]">
          <div className="flex justify-center rounded-lg">
            {
            yourVideos[0] && <img className="rounded-lg h-[175px] w-full" src={`http://localhost:3000/images/${yourVideos[0].thumbnail}`} alt="thumbnail" />
            }
          </div>
          <div>
            <h1 className="text-2xl font-bold  mt-5 font-sans">Liked videos</h1>
            <h1 className="text-lg font-bold font-sans  mt-5">{yourVideos[0].channel.channelName}</h1>
            <div className="mt-1">
            {
              yourVideos && <div className="flex gap-2 text-sm opacity-65 font-bold">
              <h1>{yourVideos[0].channel.videos.length}</h1>
              <h1>No views</h1>
              <h1>Updated {moment(yourVideos[0].createdAt).fromNow()}</h1>
              </div>
            }
            </div>
          </div>

        </div>
      </div>
      <div>
        <div className="overflow-y-auto h-full w-full custom-scroll">
          <div className="">
            <div className="pt-4">
            </div>
            <div className="mt-8 gap-3 flex flex-col ">
              {yourVideos && yourVideos.map((video, index) => (
                <div key={index} className="last:pb-[76px]" onClick={()=>{
                  navigate(`/${video._id}`)
                }}>
                  <LikedVideos video={video} channelName={video.channel.channelName} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupLikedVideos