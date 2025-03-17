import React, { useEffect, useState } from "react";
import VideoAi from "./VideoAi";
import { useAppContext } from "../../Hooks/AppContext";

const GroupVideoAi = () => {
  const { videoData } = useAppContext();
  const [visible  , setVisible] = useState(false)

  useEffect(()=>{
 if(videoData){
      setVisible(true);
 }
  },[videoData])

  return (
    <div className="gap-2 flex flex-col overflow-y-auto h-full ">
      {
       visible && videoData.map((video) => <VideoAi key={video.id.VideoId} video = {video}/>)}
    </div>
  );
};

export default GroupVideoAi;
