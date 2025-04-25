import { useEffect, useState } from "react";
import SearchVideo from "./SearchVideo"
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const GropuSearchVideos = () => {
    const params = new URLSearchParams(location.search);
    const query1 = params.get('query');
    const navigate = useNavigate();

    const suggetionsOfVodes = async () => {
        try {
            const responce = await axios.get(`http://localhost:3000/results/search?query=${query1}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                })
            console.log(responce.data.videos)
            if (responce.status === 200) {
                setVideoData(responce.data.videos);
                navigate(`/results/search?query=${query}&t=${Date.now()}`, { replace: true });
            }
            console.log(videoData)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(()=>{
        suggetionsOfVodes();
    },[]) 
    
    useEffect(()=>{
        suggetionsOfVodes();
    },[query1])

    const [videoData , setVideoData] = useState([]);

    return (
        <div className="h-screen w-[1700px] overflow-auto custom-scroll">
            <div className="flex flex-col items-center gap-5 w-[1610px]  ">
                {videoData && videoData.map((data, key) => {
                    return (
                        <div key={key} className="last:mb-16">
                            <SearchVideo data={data} />
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default GropuSearchVideos