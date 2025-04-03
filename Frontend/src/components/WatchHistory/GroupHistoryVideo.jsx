import { useEffect, useState } from "react";
import HistoryVideo from "./HistoryVideo"
import { useLocation } from "react-router-dom";
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
        setId(responce.data._id);
        // console.log(responce.data._id);
      } else {
        console.log("Error getting history video");
      }
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    if (location.pathname === '/history') {
      getHistoryVideo();
    }
  }, [location.pathname])
  const [history, seHistoty] = useState([])
  const [id , setId] =  useState('');
  return (
    <div className="ml-48 ">
      <div className="pt-4">
        <h1 className="text-4xl font-bold">Watch history</h1>
      </div>
      <div className="mt-8 gap-3 flex flex-col ">
        {history && history.map((video, index) => (
          <HistoryVideo key={index} video={video} hId={id} />
        ))}

      </div>
    </div>
  )
}

export default GroupHistoryVideo