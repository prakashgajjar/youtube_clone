import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const RunnigVideo = () => {
  const { id } = useParams();
  const getVideoDetail = async () => {
    try {
      const responce = await axios.post('http://localhost:3000/videos/detail',
        {
          videoId: id
        }
        , {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
      if (responce.status === 200 || responce.status === 201) {
        setVideoData(responce.data)
        console.log(videoData.video)
      } else {
        console.error('Error fetching video details', responce.message);
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const [videoData, setVideoData] = useState({});

  useEffect(() => {
    getVideoDetail();
  }, []);
  return (
    <div className="z-50">
      <div className="w-[1280px] h-[720px] rounded-2xl">
        {
          videoData && <div><video controls className="w-full h-full rounded-2xl">
            {
              <source src="/Frontend/public/video-1741175723721-402653096.mp4" type="" />
            }
          </video></div>
        }
      </div>
    </div>
  )
}

export default RunnigVideo