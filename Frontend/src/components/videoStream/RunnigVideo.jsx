import React, { useEffect } from 'react'

const RunnigVideo = () => {

  return (
    <div className="z-50">
    <div className="w-[1280px] h-[720px] rounded-2xl">
      <video controls className="w-full h-full rounded-2xl">
        <source src="./intro.mp4" />
      </video>
    </div>
  </div>
  )
}

export default RunnigVideo