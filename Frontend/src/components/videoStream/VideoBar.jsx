import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Hooks/AppContext';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import ReportAlert from '../components/ReportAlert';


const VideoBar = () => {
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
                console.log(responce.data.channel._id);
                setVideoData(responce.data)
                console.log(videoData)
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
                    channelId: videoData.channel._id
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
                    channelId: videoData.channel._id
                }
                , {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            if (responce.status === 200) {
                console.log('Subscribed', responce.data);
                setCheackSubscribed(true);
            } else {
                console.error('Error subscribing channel', responce.message);
                setCheackSubscribed(false);
            }
        } catch (error) {
            console.error("error in cheack subscriber", error.message)

        }
    }

    const LikeVideo = async () => {
        try {
            const responce = await axios.post('http://localhost:3000/video/like', {
                videoId: id
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })

            console.log(responce);
        } catch (error) {
            console.error(error.message)
        }
    }

    const Dislike = async () => {
        try {
            const responce = await axios.post('http://localhost:3000/video/dislike', {
                videoId: id
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            console.log(responce);
        } catch (error) {
            console.error(error.message)
        }
    }

    const checkLikeOrDislike = async () => {
        try {
            const responce = await axios.post('http://localhost:3000/video/checkLike', {
                videoId: id
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (responce.status === 200) {
                setIsLike(true);
            }
            if (responce.status === 201) {
                setIsDislike(true);
            }

        } catch (error) {
            console.error(error.message)
        }
    }

    const submitReport = async () => {
        try {
            const responce = await axios.post('http://localhost:3000/video/report', {
                videoId: id
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (responce.status === 200) {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 2000);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const [cheackSubscribed, setCheackSubscribed] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [videoData, setVideoData] = useState();
    const { showCreateChannel } = useAppContext();

    useEffect(() => {
        cheackSubscribedChannel();
        getVideoDetail();
    }, [showCreateChannel])

    useEffect(() => {
        checkLikeOrDislike();
        cheackSubscribedChannel();
    }, [videoData])
    return (
        <div>
            <div className='w-[1280px] h-[55px] mt-2'>
                <div className='flex items-center  justify-between'>
                    <div className='flex gap-3'>
                        <div className='w-[42px] h-[42px] bg-red-500 rounded-full'>

                        </div>
                        <div className='flex flex-col'>
                            {
                                videoData && <h1 className=' font-medium text-xl font-sans'>{videoData.channel.channelName}</h1>
                            }
                            {
                                videoData && <h1 className='text-white opacity-40 text-sm'>{videoData.channel.subscribers} subscriber</h1>
                            }
                        </div>
                        <div>
                            <div className={` w-24 h-10 rounded-full flex justify-center items-center ml-2  ${cheackSubscribed ? "bg-[#2b2b2b]  text-white" : "bg-white text-black"}`} onClick={() => {
                                subscribeChannel();
                            }}>
                                <h1 className={`font-semibold cursor-pointer `}>{cheackSubscribed ? "Subscribed" : "Subscribe"}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-3 ' > {/* like dislike and share and dowload and report button */}

                        <div className='h-10 w-36 bg-[#2b2b2b] text-white rounded-full flex   '>
                            <div className='w-[60%]  h-full rounded-l-full flex items-center justify-center gap-3 cursor-pointer'>
                                <img src={`logos/${isLike ? "likeClick.png" : "likeV.png"}`} alt="like" className='flex w-6' onClick={() => {
                                    LikeVideo();
                                }} />
                                <h1>{videoData ? videoData.likes.length : ""} </h1>
                            </div>
                            <div class="relative flex justify-center items-center ">
                                <svg className="w-1 h-7 text-gray-500" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            <div className='w-[40%] h-full rounded-r-full flex justify-center items-center cursor-pointer'>
                                <img src={`logos/${isDislike ? "likeClick.png" : "likeV.png"}`} alt="like" className='flex rotate-180 w-6' onClick={() => {
                                    Dislike();
                                }} />
                            </div>
                        </div>

                        <div className=' bg-[#2b2b2b] rounded-full w-24 flex justify-center items-center gap-3 cursor-pointer'>
                            <img src="logos/share.png" alt="" className='w-6' />
                            <h1>Share</h1>
                        </div>
                        <div className=' bg-[#2b2b2b] rounded-full w-32 flex justify-center items-center gap-3 cursor-pointer'>
                            <img src="logos/download.png" alt="" className='w-6' />
                            <h1>Download</h1>
                        </div>
                        <div className=' bg-[#2b2b2b] rounded-full w-28 flex justify-center items-center gap-3 cursor-pointer'>
                            <img src="logos/heart.png" alt="" className='w-6' />
                            <h1>Thanks</h1>
                        </div>
                        <div className=' bg-[#2b2b2b] rounded-full w-10 flex justify-center items-center cursor-pointer' onClick={() => {
                            setShowReport(!showReport)
                        }}>
                            <h1 className='relative -top-2 tracking-wider text-3xl'>...</h1>
                        </div>

                        <div className='relative mt-2'>
                            {

                                showReport && <div className='absolute bg-[#2b2b2b] -right-[40px] transition-all duration-300 mt-11  w-[90px]  rounded-md shadow-md py-1 flex justify-center items-center cursor-pointer' onClick={() => {
                                    submitReport();
                                }}>
                                    <div className='flex'>
                                        <h1 className='text-xl'>Report</h1>
                                    </div>
                                </div>

                            }
                        </div>

                        <div className='absolute left-[50%] top-[50%]'>
                            {
                                showAlert && <ReportAlert />
                            }
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default VideoBar