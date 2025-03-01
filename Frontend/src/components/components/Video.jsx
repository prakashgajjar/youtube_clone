import React from 'react'

const Video = () => {
  return (
    <div>
      <div className='w-[392px] h-[342px] text-white'>
        <div className='bg-blue-200 w-[392px] h-[221px] rounded-xl'>
          <img src="" className='' alt="" srcset="" />
        </div>
        <div id='writed_component' className='flex gap-3 mt-2'>
          <div className='bg-red-400 rounded-full h-10 w-10 '>
            <img src="" alt="" srcset="" />
          </div>
          <div className='-mt-1'>
            <div className='flex gap-2'>
              <h2 className='text-white text-lg font-sans font-semibold'>Javascript 10 new feature </h2>
            </div>
            <div>
              <p className='text-gray-400 text-sm'>prakash suthar</p>
              <div className='flex gap-2'>
                <h1>4k views</h1>
                <h1 className='-mt-4 text-3xl'>.</h1>
                <h1>11 hours ago</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video