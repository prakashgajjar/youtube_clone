import { useEffect, useState } from "react";
import VideoAi from "./VideoAi";
import axios from 'axios'

const GroupVideoAi = () => {

  const getVideos = async () => {
    try {
      const responce = await axios.get('http://localhost:3000/videos', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      if (responce.status === 200) {
        console.log(responce.data)
        setVideosData(responce.data)
        console.log(videoData[0].thumbnail)
      } else {
        console.error('Error fetching videos', responce.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getVideos()
  }, [])

  const [videoData , setVideosData] = useState([])

  return (
  videoData &&  <div className="gap-2 flex flex-col overflow-y-auto h-full ">
      {
       videoData.map((video) => <VideoAi key={video._id} video={video} />)}
    </div>
  );
};

export default GroupVideoAi;
