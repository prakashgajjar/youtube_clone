import { useEffect, useState } from "react";
import HistoryVideo from "./HistoryVideo"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const GroupHistoryVideo = () => {
  const location = useLocation();
  const getHistoryVideo = async () => {
    try {

      const responce = await axios.get('http://localhost:3000/watch/get', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(responce.data.watchHistory);
      if (responce.status == 200) {
        seHistoty(responce.data.watchHistory)
        // console.log(responce.data._id);
      } else {
        console.log("Error getting history video");
      }
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    if (location.pathname === '/my/history') {
      getHistoryVideo();
    }
  }, [location.pathname])
  const [history, seHistoty] = useState([])
  return (
    <div className="overflow-y-auto h-screen w-screen custom-scroll ">
      <div className="ml-48 ">
        <div className="pt-4">
          <h1 className="text-4xl font-bold">Watch history</h1>
        </div>
        <div className="mt-8 gap-3 flex flex-col ">
          {history && history.map((video, index) => (
            <div key={index} className="last:pb-[76px]" >
              <HistoryVideo  video={video}  />
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default GroupHistoryVideo