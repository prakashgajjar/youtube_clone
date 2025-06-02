import {  useEffect, useState } from "react";
// import ChannelVideosCom from "./ChannelVideoCom";
import ChannelShortComp from './ChannelShortComp'
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";


const ChannelVideos = () => {
  const {id} = useParams();
   const location = useLocation();
  const getYourVideo = async () => {
    try {

      const responce = await axios.post('http://localhost:3000/channel/shorts',
        {id : id},
        {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(responce.data.data.videos);
      if (responce.status == 200) {
        setYourVideos(responce.data.data.videos)
        setChannel(responce.data.data.channel[0])
        setChannelId(responce.data.data._id);
      } else {
        console.log("Error getting history video");
      }
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    if (location.pathname === '/channel/') {
      getYourVideo();
    }
  }, [location.pathname])

  useEffect(() => {
    getYourVideo();
  },[])



  const [yourVideos, setYourVideos] = useState([]);
    const [channel , setChannel] = useState();
    const [channelId, setChannelId] = useState('');
  return (
    <div className="">
             <div className="mt-2 gap-4 flex ">
          {yourVideos && yourVideos.map((video, index) => (
           video.isShorts && <div key={index} className=" flex " >
              <ChannelShortComp  video={video} channel={channel} hId={channelId} />
            </div>
          ))}
        </div>
    </div>
  )
}

export default ChannelVideos