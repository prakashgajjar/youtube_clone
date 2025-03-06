import React, { useEffect , useState } from 'react'
import { useAppContext } from '../../Hooks/AppContext';
import axios from 'axios';
import {useParams} from 'react-router-dom'

const VideoBar = () => {
    const {id} = useParams();
    const getVideoDetail = async () => {
        try {
            const responce = await axios.post('http://localhost:3000/videos/detail',
                {
                    videoId : id
                }
                , {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            if (responce.status === 200 || responce.status === 201) {
                console.log(responce.data.channel._id);
                setVideoData(responce.data)
                console.log(videoData.channel)
            } else {
                console.error('Error fetching video details', responce.message);
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const subscribeChannel = async () => {
        try {
            const responce = await axios.post('http://localhost:3000/channel/subscribe',
                {
                    channelId : videoData.channel._id
                }
                , {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            if (responce.status === 200) {
                console.log('Subscribed successfully', responce.data);
            } else {
                console.error('Error subscribing channel', responce.message);
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const cheackSubscribedChannel = async () => {
        try {
            const responce = await axios.post('http://localhost:3000/channel/isSubcribed',
                {
                    channelId : videoData.channel._id
                }
                , {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            if (responce.status === 200) {
                console.log('Subscribed successfully', responce.data);
                setCheackSubscribed(true);
            } else {
                console.error('Error subscribing channel', responce.message);
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const [cheackSubscribed , setCheackSubscribed] = useState(false);
    const [videoData , setVideoData] = useState();
    const { showCreateChannel } = useAppContext();

    useEffect(() => {
        setTimeout(() => {
            getVideoDetail();
        }, 100)
    }, [showCreateChannel])

    useEffect(() => {
            cheackSubscribedChannel();
    },[])
    return (
        <div>
            <div className='w-[1280px] h-[55px] mt-2'>
                <div className='flex items-center gap-3'>
                    <div className='w-[42px] h-[42px] bg-red-500 rounded-full'>

                    </div>
                    <div className='flex flex-col'>
                        {
                        videoData &&  <h1 className=' font-medium text-xl font-sans'>{videoData.channel.channelName}</h1>
                    }
                    {
                        videoData &&  <h1 className='text-white opacity-40 text-sm'>{videoData.channel.subscribers} subscriber</h1>
                    }
                    </div>
                    <div>
                        {
                            cheackSubscribed ? (
                                <div className='bg-white text-black w-24 h-10 rounded-full flex justify-center items-center ml-2' onClick={()=>{
                                    subscribeChannel();
                                }}>
                                    <h1 className='font-semibold cursor-pointer'>Subscribe</h1>
                                </div>
                            ):(
                                <div className='bg-white text-black w-24 h-10 rounded-full flex justify-center items-center ml-2' onClick={()=>{
                                    subscribeChannel();
                                }}>
                                    <h1 className='font-semibold cursor-pointer'>UnSubscribe</h1>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default VideoBar