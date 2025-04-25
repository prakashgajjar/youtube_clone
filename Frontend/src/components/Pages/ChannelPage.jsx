import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { UploadCloud } from "lucide-react"
import AuthUser from '../components/AuthUser';
import axios from 'axios';

const ChannelPage = () => {
    const { id } = useParams();
    const formdData = new FormData();
    formdData.append('id', id);

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
                setChannelDetail(responce.data.getChanneDetail)
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
        formData.append("id", id); // append channel ID if needed

        channelBannerUpade(formData); // pass the real formData here
    }

    const channelBannerUpdate1 = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profile", file);
        formData.append("id", id); // append channel ID if needed

        channelBannerUpade1(formData); // pass the real formData here
    }

    // Actual API call
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
                getChanelDetail(); // refresh banner after update
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
                getChanelDetail(); // refresh banner after update
            }
        } catch (error) {
            console.error("Upload error:", error.message);
        }
    }
    useEffect(() => {
        getChanelDetail()
    }, []);

    const location = useLocation();

    useEffect(() => {
        getChanelDetail();
    }, [location.pathname])

    const fileInputRef = useRef(null)

    const handleBannerClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }


    const [channelDetail, setChannelDetail] = useState(null)
    return (
        channelDetail && <div className="min-h-screen overflow-auto">
            <div className='flex flex-col text-white '>
                <div className="relative w-[1300px] h-[203px] rounded-xl overflow-hidden group">
                    {/* Banner Image */}
                    <img
                        src={`http://localhost:3000/banners/${channelDetail && channelDetail.banner}`}
                        alt="Banner"
                        className="w-full h-full object-cover bg-zinc-800 rounded-xl"
                    />

                    {/* Upload Overlay on Hover */}
                    <div
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        onClick={handleBannerClick}
                    >
                        <div className="flex flex-col items-center text-white">
                            <UploadCloud className="w-8 h-8 mb-2" />
                            <span className="text-sm font-medium">Change Banner</span>
                        </div>
                    </div>

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={channelBannerUpdate}
                    />
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
                            <div
                                className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                onClick={handleBannerClick}
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
                                ref={fileInputRef}
                                onChange={channelBannerUpdate1}
                            />
                        </div>

                        {/* Channel Info Section */}
                        <div className="flex flex-col">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-4xl font-bold">{channelDetail.channelName}</h1>
                                <h1 className="text-lg">{channelDetail.ChannelHandle}</h1>

                                {AuthUser ? (
                                    <div className="flex gap-2 mt-2 -ml-1">
                                        <div className="w-40 font-semibold flex justify-center items-center rounded-3xl whitespace-nowrap h-8 bg-white bg-opacity-10 text-white">
                                            <h1>Customize channel</h1>
                                        </div>
                                        <div className="w-40 font-semibold whitespace-nowrap h-8 flex justify-center items-center rounded-3xl bg-white bg-opacity-10 text-white">
                                            <h1>Manage videos</h1>
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-2 h-screen'>
                    <div>

                    </div>
                    <div>
                        <hr />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ChannelPage