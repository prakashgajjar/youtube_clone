import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { UploadCloud } from "lucide-react"
import axios from 'axios';
import { Outlet } from 'react-router-dom';

const ChannelPage = () => {
    const { id } = useParams();
    const formdData = new FormData();
    const [channelOwner, setChannelOwner] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    formdData.append('id', id);

    const checkChannelOwner = async () => {
        try {
            const response = await axios.post('http://localhost:3000/channel/checkowner', {
                id: id
            }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response.status == 201) {
                setChannelOwner(response.data.state);
            }else{
                setChannelOwner(false)
            }
        } catch (error) {
            console.log(error.message)
            setChannelOwner(false)
        }
    }

    const checkSubscribedChannel = async () => {
        try {
            const response = await axios.post('http://localhost:3000/channel/isSubcribed',
                { channelId: id },
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

    const subscribeChannel = async () => {
        try {
            const response = await axios.post('http://localhost:3000/channel/subscribe',
                { channelId: id },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true });

            if (response.status === 200) {
                setIsSubscribed(true);
            }
        } catch (error) {
            console.error('Error subscribing:', error.message);
        }
    };

    const getChanelDetail = async () => {
        try {
            const responce = await axios.post('http://localhost:3000/channel/detail/id',
                {
                    id: id
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            if (responce.status == 201) {
                console.log(responce);
                setChannelDetail(responce.data.getChannelDetail)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const channelBannerUpdate = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("banner", file);
        formData.append("id", id);

        channelBannerUpade(formData);
    }

    const channelBannerUpdate1 = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profile", file);
        formData.append("id", id);

        channelBannerUpade1(formData);
    }

    const channelBannerUpade = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3000/channel/update/banner', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (response.status === 201) {
                console.log("Banner updated!", response.data);
                getChanelDetail();
            }
        } catch (error) {
            console.error("Upload error:", error.message);
        }
    }

    const channelBannerUpade1 = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3000/channel/update/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (response.status === 201) {
                console.log("Banner updated!", response.data);
                getChanelDetail();
            }
        } catch (error) {
            console.error("Upload error:", error.message);
        }
    }
    useEffect(() => {
        getChanelDetail();
        checkChannelOwner();
        checkSubscribedChannel();
    }, []);

    const location = useLocation();

    useEffect(() => {
        checkChannelOwner();
        getChanelDetail();
    }, [location.pathname])

    const fileInputRef = useRef(null)
    const fileInputRef1 = useRef(null)

    const handleBannerClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }
    const handleBannerClick1 = () => {
        if (fileInputRef1.current) {
            fileInputRef1.current.click()
        }
    }


    const [channelDetail, setChannelDetail] = useState(null)
    return (
        channelDetail && <div className="h-screen w-screen flex flex-col items-center overflow-auto">
            <div className=' flex flex-col text-white '>
                <div className="relative w-[1300px] h-[203px] rounded-xl  group">
                    {/* Banner Image */}
                    <img
                        src={`http://localhost:3000/banners/${channelDetail && channelDetail.banner}`}
                        alt="Banner"
                        className="w-full h-full object-cover bg-zinc-800 rounded-xl"
                    />

                    {
                        channelOwner && <div>
                            <div
                                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                onClick={handleBannerClick}
                            >
                                <div className="flex flex-col items-center text-white">
                                    <UploadCloud className="w-8 h-8 mb-2" />
                                    <span className="text-sm font-medium">Change Banner</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={channelBannerUpdate}
                            />
                        </div>
                    }

                </div>
                <div>
                    <div className="flex gap-4 mt-10 items-center">
                        {/* Profile Picture Section */}
                        <div className="relative group">
                            {/* Profile Picture */}
                            <img
                                src={`http://localhost:3000/banners/${channelDetail.profilePicture}`}
                                alt="Profile"
                                className="bg-blue-500 w-[160px] h-[160px] rounded-full"
                            />

                            {/* Upload Overlay on Hover */}

                            {channelOwner && <div>
                                <div
                                    className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                    onClick={handleBannerClick1}
                                >
                                    <div className="flex flex-col items-center text-white">
                                        <UploadCloud className="w-8 h-8 mb-2" />
                                        <span className="text-sm font-medium">Change Profile</span>
                                    </div>
                                </div>

                                {/* Hidden File Input for Profile Picture */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef1}
                                    onChange={channelBannerUpdate1}
                                />
                            </div>}
                        </div>

                        {/* Channel Info Section */}
                        <div className="flex flex-col">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-4xl font-bold">{channelDetail.channelName}</h1>
                                <h1 className="text-lg">{channelDetail.ChannelHandle}</h1>

                                {channelOwner ? (
                                    <div className="flex gap-2 mt-2 -ml-1">
                                        <div className="w-40 font-semibold flex justify-center items-center rounded-3xl whitespace-nowrap h-8 bg-white bg-opacity-10 text-white">
                                            <h1>Customize channel</h1>
                                        </div>
                                        <div className="w-40 font-semibold whitespace-nowrap h-8 flex justify-center items-center rounded-3xl bg-white bg-opacity-10 text-white">
                                            <h1>Manage videos</h1>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={`w-28 mt-1 h-10 -ml-1 rounded-full flex justify-center items-center cursor-pointer ${isSubscribed ? "bg-[#2b2b2b] text-white" : "bg-white text-black"}`}
                                        onClick={subscribeChannel}
                                    >
                                        <h1 className="font-semibold">{isSubscribed ? "Subscribed" : "Subscribe"}</h1>
                                    </div>
                                )

                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-5 '>
                    <div>
                        <ul className='flex gap-5 text-[17px] font-sans font-semibold  ml-1 '>
                            <NavLink className={({ isActive }) => (isActive ? "border-b-2 hover:text-white" : "hover:text-white hover:border-white hover:border-opacity-55  hover:opacity-100 opacity-55 border-b-2 border-transparent pb-2")} end to={`/channel/${id}`}>Home</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? "border-b-2 hover:text-white" : "hover:text-white hover:border-white hover:border-opacity-55  hover:opacity-100 opacity-55  pb-2 border-b-2 border-transparent")} to={`/channel/${id}/videos`}>Videos</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? "border-b-2 hover:text-white" : "hover:text-white hover:border-white hover:border-opacity-55  hover:opacity-100 opacity-55 pb-2 border-b-2 border-transparent")} to={`/channel/${id}/shorts`}>Shorts</NavLink>
                        </ul>
                    </div>
                    <div className='opacity-25 '>
                        <hr className=' ' />
                    </div>
                </div>
                <div className='mt-4 h-screen overflow-hidden'>
                    <Outlet />
                </div>
            </div>
        </div >
    )
}

export default ChannelPage