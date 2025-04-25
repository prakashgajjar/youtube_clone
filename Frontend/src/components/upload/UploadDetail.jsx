import { useState, useRef, useEffect } from 'react'
import { Listbox } from '@headlessui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UploadDetail = () => {

    const sendVideAndThumbnail = async () => {
        const formData = new FormData();
        formData.append("video", videoDetail);
        formData.append("thumbnail", thumbnailDetail);
        formData.append("tital", tital);
        formData.append("description", description);
        formData.append("category", selectedCategory);
        formData.append("videoType" , videoType);
        formData.append('isMakeForKid' , makeForChild )
        // console.log(thumbnailDetail, videoDetail);
        try {
            const responce = await axios.post('http://localhost:3000/upload/video', formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            )
            if (responce.status === 200) {
                console.log('Video uploaded successfully', responce.data);
                navigate('/');

            } else {
                console.error('Error uploading video');
            }
        } catch (error) {
            console.error({ error: error.messgae, where: "videoAndThumbnail" })
        }
    }
    const [borderActive, setBorderActive] = useState(false)
    const [borderActive1, setBorderActive1] = useState(false)
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoDetail, setVideoDetail] = useState(null);
    const [thumbnailDetail, setThumbnailDetail] = useState(null);
    const [tital, setTital] = useState(null);
    const [description, setDescription] = useState(null);
    const diveRef1 = useRef(null);
    const diveRef2 = useRef(null);
    const navigate = useNavigate(null);
    const categories = [
        'Anime',
        'Comedy',
        'Education',
        'Technology',
        'Fitness',
        'Gaming',
        'Music',
        'Travel',
        'Fashion',
        'Motivation',
        'Sports',
        'Science',
        'News',
        'Movies',
        'Vlogs',
        'Art',
        'DIY',
        'Food',
        'Finance',
        'History',
        'Nature',
        'Documentary',
        'Automobiles',
        'Podcast',
    ];
    
    const [selectedCategory, setSelectedCategory] = useState(categories[0])
    const [makeForChild , setMakeForChild] = useState('no')
    const [videoType , setVideoType] = useState("video")

    useEffect(() => {
        console.log("Thumbnail Updated:", thumbnailDetail);
        console.log("Video Updated:", videoDetail);
    }, [thumbnailDetail, videoDetail]);

    return (
        <div className='flex justify-center items-center h-screen w-screen bg-zinc-950 text-white'>
            <div className='w-[1000px] h-[880px] bg-[#282828] rounded-[30px]'>
                <div className='h-[68px] border-white  border-b-[1px] border-opacity-20 w-full flex items-center justify-between px-7'>
                    <h1 className='text-xl font-bold'>{videoDetail ? `${videoDetail.name.split(".").slice(0, -1).join(".")}` : ""}</h1>
                    <div className=' cursor-pointer' onClick={() => {
                        navigate('/');
                    }}>
                        <img src="/logos/cross.png" className='' alt="" />
                    </div>
                </div>
                <div className='flex h-[750px] '>
                    <div className='w-[600px]  h-full pl-10'>
                        <div>
                            <div>
                                <h1 className='font-bold text-2xl mt-3'>Details</h1>
                            </div>
                            <div onClick={() => {
                                setBorderActive(true)
                                setBorderActive1(false);
                            }} ref={diveRef1} className={`w-[536px] h-[80px] border border-white hover:border-white   ${borderActive ? "" : "border-opacity-15"}  rounded-lg flex justify-center items-center mt-4`}>
                                <h1 className='absolute top-40 left-[515px] text-sm font-sans opacity-80 mt-7'>Tital(required)</h1>
                                <input type="text" name="tital" id="tital" className='w-full h-8 bg-transparent outline-none mx-4' value={tital} onChange={(e) => {
                                    setTital(e.target.value);
                                }} />
                            </div>

                            <div onClick={() => {
                                setBorderActive(false);
                                setBorderActive1(true);
                            }} ref={diveRef2} className={`w-[536px] h-[200px] border rounded-lg flex hover:border-white  border-white ${borderActive1 ? "" : "border-opacity-15"} justify-center items-center mt-4`}>
                                <h1 className='absolute top-[260px] left-[515px] text-sm font-sans opacity-80 mt-7'>Description</h1>
                                <textarea type="text" name="tital" id="tital" className='bg-transparent resize-none w-[536px]  h-[170px] mt-4 outline-none mx-4' value={description} onChange={(e) => {
                                    setDescription(e.target.value);
                                }} />
                            </div>
                        </div>
                        <div className='flex gap-8'>
                            <div className='flex flex-col'>
                                <div>
                                    <h1 className='mt-4 text-lg font-bold'>Video</h1>
                                </div>
                                <div className="border border-dashed border-white border-opacity-35 rounded-md w-44 h-24 mt-2 flex items-center justify-center relative cursor-pointer">
                                    <input type="file" id="uploadVideo" className="hidden" onChange={(e) => {
                                        const file = e.target.files[0];
                                        console.log(file);
                                        setVideoDetail(file);
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            setVideoUrl(event.target.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }} />
                                    <label
                                        htmlFor="uploadVideo"
                                        className="text-white text-sm font-medium cursor-pointer flex flex-col items-center gap-1"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-gray-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Upload Video
                                    </label>
                                </div>

                            </div>
                            <div>
                                <div>
                                    <h1 className='mt-4 text-lg font-bold'>Thumbnail</h1>
                                </div>
                                <div className="border border-dashed border-white border-opacity-35 rounded-md w-44 h-24 mt-2 flex items-center justify-center cursor-pointer relative">
                                    <input type="file" id="thumbnailUpload" className="hidden" onChange={(e) => {
                                        const file1 = e.target.files[0];
                                        if (!file1) {
                                            console.error('No file selected');
                                            return;
                                        }
                                        setThumbnailDetail(file1);
                                        const reader = new FileReader();
                                        reader.readAsDataURL(file1);
                                    }} />
                                    <label
                                        htmlFor="thumbnailUpload"
                                        className="text-white text-sm font-medium cursor-pointer flex flex-col items-center gap-1"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-gray-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Upload Thumbnail
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div>
                            <h1 className='text-lg font-bold mt-4'>Audience</h1>
                            <h1 className='text-[16px] mt-1 font-bold'>Is this video made for kids? (required)</h1>
                            <p className='text-sm mt-3'>
                                Regardless of your location, youre legally required to comply with the Childrens Online Privacy Protection Act (COPPA) and/or other laws. You're required to tell us whether your videos are made for kids. <span className='text-blue-400'> What's content made for kids?</span></p>
                        </div>
                        <div>
                            <div className="flex gap-2 flex-col mt-7 ">
                                <div>
                                    <input type="radio" name="kid-yes" id="kid-yes" value={'yes'} 
                                    checked={makeForChild === "yes"}
                                    onChange={(e)=>setMakeForChild(e.target.value)}/>
                                    <label htmlFor="kid-yes" className='font-semibold'> Yes, its made for kids</label>
                                </div>
                                <div>
                                    <input type="radio" name="kid-no" id="kid-no" value={'no'} 
                                    checked ={makeForChild === 'no'}
                                    onChange={(e)=>setMakeForChild(e.target.value)}/>
                                    <label htmlFor="kid-no" className='font-semibold'> No, its not made for kids</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-6">
                        <div className="w-80 h-[300px] rounded-lg mt-[60px] shadow-sm shadow-gray-900 p-3 bg-zinc-900 ">
                            <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                                <video src={videoUrl} className="w-full h-full rounded-lg" controls></video>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div>
                                    <h2 className="font-semibold text-white opacity-40">Video link</h2>
                                    <p className="text-blue-400 break-all cursor-pointer">
                                    </p>
                                </div>

                                <div>
                                    <h2 className="font-semibold text-white opacity-40">Filename</h2>
                                    <p className="text-white">{videoDetail ? videoDetail.name : ""}</p>
                                </div>
                            </div>
                        </div>

                        {/*that a selcetion part */}

                        <div className="w-64 mt-5">
                            <label className="block text-[18px] font-bold mb-3">
                                Category of your video
                            </label>

                            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                                <div className="relative">
                                    <Listbox.Button className="w-full border border-gray-300 rounded-lg p-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        {selectedCategory}
                                    </Listbox.Button>

                                    <Listbox.Options className="absolute mt-1 max-h-64 w-full custom-scroll overflow-y-auto rounded-lg bg-[#282828] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                        {categories.map((category, index) => (
                                            <Listbox.Option
                                                key={index}
                                                value={category}
                                                className={({ active }) =>
                                                    `cursor-pointer select-none p-2 ${active ? 'bg-gray-500 bg-opacity-35' : ''
                                                    }`
                                                }
                                            >
                                                {category}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                        </div>

                        {/* this is select fo shorts or video */}
                        <h1 className='mt-5 text-xl font-bold '>Select your video type</h1>
                        <div className='mt-3 flex gap-5'>
                            <div className='gap-2 flex'>
                                <input type="radio" name="type" id="video" value="video"  checked={videoType === "video"} 
                                onChange={(e)=>setVideoType(e.target.value)}
                                />
                                <label htmlFor="video">Video</label>
                            </div>
                            <div className='gap-2 flex'>
                                <input type="radio" name="type" id="short" value="short"  checked={videoType === "short"}
                                onChange={(e)=>setVideoType(e.target.value)}
                                />
                                <label htmlFor="short">Short</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-[60px] border-t-[1px] border-opacity-25 border-white mt-2 flex justify-between items-center px-6'>
                    <div className='w-[70px] h-9 bg-white rounded-full hover:bg-gray-300 active:scale-105  mb-1 text-black flex justify-center items-center'>
                        <h1 className='font-sans text-md font-semibold cursor-pointer ' onClick={() => {
                            navigate('/')
                        }}>Prev</h1>
                    </div>
                    <div className='w-[70px] h-9 bg-white rounded-full hover:bg-gray-300 active:scale-105  mb-1 text-black flex justify-center items-center'>
                        <h1 className='font-sans text-md font-semibold cursor-pointer ' onClick={() => {
                            sendVideAndThumbnail();
                        }}>Next</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadDetail