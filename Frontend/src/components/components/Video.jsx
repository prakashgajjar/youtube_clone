import React from 'react'
import moment from "moment";

const Video = ({video}) => {
  return (
    <div>
      <div className='w-[392px] h-[342px] text-white'>
        <div className='w-[392px] h-[221px] rounded-xl'>
        <img src={`http://localhost:3000/images/${video.thumbnail}`} className="w-full h-full rounded-xl" alt="Thumbnail" />
        </div>
        <div id='writed_component' className='flex gap-3 mt-2'>
          <div className='bg-red-400 rounded-full h-10 w-10 '>
            <img src="" alt="" srcset="" />
          </div>
          <div className='-mt-1'>
            <div className='flex gap-2 max-h-14  overflow-hidden'>
              <h2 className='text-white text-lg font-sans font-semibold  w-[335px] '>{video.tital}</h2>
            </div>
            <div>
              <p className='text-gray-400 text-sm'>{video.channel.ChannelHandle}</p>
              <div className='flex gap-2'>
                <h1>{video.views} views</h1>
                <h1 className='-mt-4 text-3xl'>.</h1>
                <h1>{moment(video.createdAt).fromNow()}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video