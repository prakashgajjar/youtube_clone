import React from 'react'

const ListComponent = ({name , url}) => {
  return (
    <div>
        <div className='flex gap-5 h-9 items-center w-44 rounded-lg hover:bg-opacity-10  hover:bg-white'>
            <div className='ml-2'>
                <img src={`${url}`} alt="" srcset="" />
            </div>
            <div>
                <h1 className='text-white'>{name}</h1>
            </div>
        </div>  
    </div>
  )
}

export default ListComponent