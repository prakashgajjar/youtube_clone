import React from 'react'

const UploadVideoBtn = () => {
  return (
    <div>
      <div className='h-10 w-24 bg-white  bg-opacity-5 flex justify-center gap-2 pl-1 items-center rounded-3xl pr-3'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>

        <h1 className='text-white text-sm font-semibold'>Create</h1>

      </div>
    </div>
  )
}

export default UploadVideoBtn