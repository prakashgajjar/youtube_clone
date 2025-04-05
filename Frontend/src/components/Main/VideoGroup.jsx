import  { useState, useEffect } from 'react'
import Video from '../components/Video'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const VideoGroup = () => {
    const getVideos = async () => {
        try {
            const responce = await axios.get('http://localhost:3000/videos', {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (responce.status === 200) {
                console.log(responce.data)
                setVideosData(responce.data)
            } else {
                console.error('Error fetching videos', responce.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addVideoInUserHistory = async (id) => {
        try {
            const responce = await axios.post('http://localhost:3000/watch/add', 
                {
                    videoId: id
                },{
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (responce.status === 200) {
                console.log(responce.data)
            } else {
                console.error('Error fetching videos', responce.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [videosData, setVideosData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getVideos()
    }, [])

    return (
        <div className='flex flex-wrap gap-[19px] overflow-y-auto custom-scroll'>
            {
                videosData && videosData.map((data, index) => {
                    return (
                        <div className='cursor-pointer  ' key={data._id || index} onClick={()=>{
                            console.log('Page is open');
                            addVideoInUserHistory(data._id);
                        }}>
                            <Video video={data} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default VideoGroup