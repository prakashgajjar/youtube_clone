import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const VideoAi = ({ video }) => {

    const navigate = useNavigate();
    return (
        <div>
            <div className='flex  justify-start items-center'>
                <div className='w-44 h-24 rounded-xl ml-1' onClick={() => {
                    navigate(`/video/${video._id}`)
                    location.reload();
                }}>
                    <img src={`http://localhost:3000/images/${video.thumbnail}`} alt="thumbnail" className='w-full h-full rounded-xl' />
                </div>
                <div className='flex-col flex ml-2 w-72  '>
                    <h1 className='tracking-tight font-semibold w-full h-10 overflow-hidden text-sm  ' onClick={() => {
                        navigate(`/${video._id}`)
                    }}>{video.tital}</h1>
                    <div onClick={() => {
                        navigate(`/channel/${video.channel._id}`)
                    }}>
                        <div className=' mt-1 cursor-pointer'>
                            <h1 className='text-[16px] font-medium opacity-60'>{video.channel.channelName}</h1>
                        </div>
                        <div className='flex gap-2 cursor-pointer '>
                            <span className='opacity-60 text-sm'>{video.views} views</span>
                            <span className='opacity-60 -mt-1'>.</span>
                            <span className='opacity-60 text-sm font-medium'>{moment(video.createdAt).fromNow()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoAi