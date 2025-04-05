import {  useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const RunnigVideo = () => {
  const { id } = useParams();
  const viewsAdd = async () => {
    try {
      const responce = await axios.post('http://localhost:3000/views/add',
        {
          videoId: id
        }
        , {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
      if (responce.status === 200 || responce.status === 201) {
        console.log(responce)
      } else {
        console.error('Error fetching video details', responce.message);
      }
    } catch (error) {
      console.error(error.message)
    }
  }

const [timeoutid , setTimeoutId] = useState(null);
const [hascount , setHasCount] = useState(false);

const videoRef= useRef();

  return (
    <div className="z-50">
      <div className="w-[1280px] h-[720px] rounded-2xl">
        {
          <div><video ref={videoRef} controls className="w-full h-full rounded-2xl"
          onPlay={()=>{

            if(!hascount){
            setTimeoutId(  
              setTimeout(()=>{
                setHasCount(true);
                viewsAdd();
              },[5000])
            )
              videoRef.current.addEventListener("pause",()=>{
                clearTimeout(timeoutid)
              })
              videoRef.current.addEventListener("end",()=>{
                clearTimeout(timeoutid)
              })
              
            }
        }}>
          <source src="/video-1741175723721-402653096.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </div>
        }
      </div>
    </div>
  )
}

export default RunnigVideo