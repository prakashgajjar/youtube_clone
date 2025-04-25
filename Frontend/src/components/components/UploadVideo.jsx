
import { useAppContext } from '../../Hooks/AppContext';
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
    const { showUploadVideo , setShowUploadVideo } = useAppContext();
    const navigate = useNavigate();
    return (

        showUploadVideo && <div>
            <div className='w-40 h-20 bg-[#282828] flex justify-center items-center p-2 rounded-xl flex-col  gap-2 font-sans'>
                <div className='w-full hover:bg-white hover:bg-opacity-20 px-2 py-1 rounded-md gap-2 flex cursor-pointer  items-center' onClick={() => {
                   setShowUploadVideo(false)
                   navigate('/upload/video');
                }}>
                    <img src="http://localhost:5173/logos/GoLive.png" alt="live"  />
                    <h1 className='text-white text-md'>Upload video</h1>
                </div>
                <div className='w-full hover:bg-white hover:bg-opacity-20 px-2 py-1 rounded-md flex cursor-pointer  items-center gap-2'>
                    <img src="http://localhost:5173/logos/your_video.png" alt="" />
                    <h1 className='text-white text-md '>Go live</h1>
                </div>
            </div>
        </div>
    )
}

export default UploadVideo