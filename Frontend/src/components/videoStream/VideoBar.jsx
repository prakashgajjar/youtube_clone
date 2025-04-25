import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReportAlert from '../components/ReportAlert';
import moment from 'moment';
import GroupComment from '../Features/GroupComment';
import InputComment from '../Features/InputComment';

const VideoBar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [videoData, setVideoData] = useState(null);
    const [like, setLike] = useState(null);
    const [isLike, setIsLike] = useState(null);
    const [isDislike, setIsDislike] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // 1. Get video details
    const getVideoDetail = async () => {
        try {
            const response = await axios.post('http://localhost:3000/videos/detail',
                { videoId: id },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true });

            if (response.status === 200 || response.status === 201) {
                setVideoData(response.data);
                setLike(response.data.likes.length);
            }
        } catch (error) {
            console.error('Error fetching video details:', error.message);
        }
    };

    // 2. Subscribe channel
    const subscribeChannel = async () => {
        try {
            const response = await axios.post('http://localhost:3000/channel/subscribe',
                { channelId: videoData.channel._id },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true });

            if (response.status === 200) {
                setIsSubscribed(true);
            }
        } catch (error) {
            console.error('Error subscribing:', error.message);
        }
    };

    // 3. Check if already subscribed
    const checkSubscribedChannel = async () => {
        try {
            const response = await axios.post('http://localhost:3000/channel/isSubcribed',
                { channelId: videoData.channel._id },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true });

            if (response.status === 200) {
                setIsSubscribed(true);
            } else {
                setIsSubscribed(false);
            }
        } catch (error) {
            console.error('Error checking subscription:', error.message);
        }
    };

    // 4. Like video
    const likeVideo = async () => {
        try {
            const response = await axios.post('http://localhost:3000/video/like',
                { videoId: id },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true });

            if (response.status === 200) {
                setLike(response.data.video.likes.length);
                setIsLike(true);
                setIsDislike(false);
            }
        } catch (error) {
            console.error('Error liking video:', error.message);
        }
    };

    // 5. Dislike video
    const dislikeVideo = async () => {
        try {
            const response = await axios.post('http://localhost:3000/video/dislike',
                { videoId: id },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true });

            if (response.status === 200) {
                setIsDislike(true);
                setIsLike(false);
            }
        } catch (error) {
            console.error('Error disliking video:', error.message);
        }
    };

    // 6. Check like/dislike status
    const checkLikeOrDislike = async () => {
        try {
            const response = await axios.post('http://localhost:3000/video/checkLike',
                { videoId: id },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true });

            if (response.status === 200) {
                setIsLike(response.data.isLiked);
                setIsDislike(response.data.isDisLiked);
            }
        } catch (error) {
            console.error('Error checking like/dislike:', error.message);
        }
    };

    // 7. Report video
    const submitReport = async () => {
        try {
            const response = await axios.post('http://localhost:3000/video/report',
                { videoId: id },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true });

            if (response.status === 200) {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 2000);
            }
        } catch (error) {
            console.error('Error reporting video:', error.message);
        }
    };

    // Fetch video on id change
    useEffect(() => {
        if (id) getVideoDetail();
    }, [id]);

    // When video data is fetched
    useEffect(() => {
        if (videoData) {
            checkSubscribedChannel();
            checkLikeOrDislike();
        }
    }, [videoData]);

    if (!videoData) return <div className="text-white mt-10">Loading video details...</div>;

    return (
        <div className="text-white">
            <h1 className="font-bold text-xl font-sans mt-2">{videoData.title}</h1>

            <div className="w-[1280px] h-[55px] mt-2">
                <div className="flex items-center justify-between">
                    {/* Channel Info */}
                    <div className="flex gap-3">
                        <img
                            className="w-[42px] h-[42px] rounded-full"
                            src={`http://localhost:3000/banners/${videoData.channel.profilePicture}`}
                            alt="Channel"
                        />
                        <div
                            className="flex flex-col cursor-pointer"
                            onClick={() => navigate(`/channel/${videoData.channel._id}`)}
                        >
                            <h1 className="font-medium text-xl">{videoData.channel.channelName}</h1>
                            <p className="text-white opacity-40 text-sm">{videoData.channel.subscribers} subscribers</p>
                        </div>
                        <div
                            className={`w-24 h-10 rounded-full flex justify-center items-center ml-2 cursor-pointer ${isSubscribed ? "bg-[#2b2b2b] text-white" : "bg-white text-black"}`}
                            onClick={subscribeChannel}
                        >
                            <h1 className="font-semibold">{isSubscribed ? "Subscribed" : "Subscribe"}</h1>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        {/* Like/Dislike */}
                        <div className="h-10 w-36 bg-[#2b2b2b] rounded-full flex">
                            <div className="w-[60%] flex items-center justify-center gap-2 cursor-pointer" onClick={likeVideo}>
                                <img src={`http://localhost:5173/logos/${isLike ? "like.png" : "likeV.png"}`} className="w-6" />
                                <h1>{like}</h1>
                            </div>
                            <div className="w-[2px] bg-gray-600"></div>
                            <div className="w-[40%] flex items-center justify-center cursor-pointer" onClick={dislikeVideo}>
                                <img src={`http://localhost:5173/logos/${isDislike ? "dislike.png" : "likeV.png"}`} className="w-6 rotate-180" />
                            </div>
                        </div>

                        {/* Share */}
                        <div className="bg-[#2b2b2b] rounded-full w-24 flex justify-center items-center gap-2 cursor-pointer">
                            <img src="http://localhost:5173/logos/share.png" className="w-6" />
                            <h1>Share</h1>
                        </div>

                        {/* Download */}
                        <div className="bg-[#2b2b2b] rounded-full w-32 flex justify-center items-center gap-2 cursor-pointer">
                            <img src="http://localhost:5173/logos/download.png" className="w-6" />
                            <h1>Download</h1>
                        </div>

                        {/* Thanks */}
                        <div className="bg-[#2b2b2b] rounded-full w-28 flex justify-center items-center gap-2 cursor-pointer">
                            <img src="http://localhost:5173/logos/heart.png" className="w-6" />
                            <h1>Thanks</h1>
                        </div>

                        {/* Report Button */}
                        <div className="bg-[#2b2b2b] rounded-full w-10 flex justify-center items-center cursor-pointer" onClick={() => setShowReport(!showReport)}>
                            <h1 className="text-3xl flex -mt-4" >...</h1>
                        </div>

                        {/* Report Dropdown */}
                        {showReport && (
                            <div className="absolute mt-12 -ml-10 bg-[#2b2b2b] w-[90px] rounded-md shadow-md py-1 flex justify-center items-center cursor-pointer" onClick={submitReport}>
                                <h1 className="text-xl">Report</h1>
                            </div>
                        )}

                        {/* Alert */}
                        {showAlert && (
                            <div className="absolute left-[50%] top-[50%]">
                                <ReportAlert />
                            </div>
                        )}
                    </div>
                </div>

                {/* Description Box */}
                <div className="bg-[#303030] rounded-xl max-h-28 w-full mt-3 p-4">
                    <div className="flex gap-4">
                        <h1 className="font-semibold">{videoData.views} views</h1>
                        <h1 className="font-semibold">{moment(videoData.createdAt).fromNow()}</h1>
                    </div>
                    <p className="mt-2">{videoData.description}</p>
                </div>

                {/* Comment Section */}
                <div className="mt-6">
                    <InputComment />
                </div>
                <div className="mt-8">
                    <GroupComment />
                </div>
            </div>
        </div>
    );
};
export default VideoBar;
