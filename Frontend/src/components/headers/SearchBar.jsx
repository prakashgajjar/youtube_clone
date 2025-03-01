import React from 'react'

const SearchBar = () => {
  return (
    <div>
      <div className='flex'>
        <div className=''>
          <input type="text" className='outline-1 outline-blue-800 focus:outline  text-white border-opacity-10  bg-zinc-900 pl-4 rounded-l-full border border-white w-[530px] h-10' placeholder='Search' />
        </div>
        <div className=' w-16 ml-[1px]  border-t border-b border-e border-white bg-[#222222] border-opacity-10 flex justify-center items-center rounded-r-full h-10'>
          <img src="logos/search.png" className='w-[24px]' alt="" />
        </div>
      </div>
    </div>
  )
}

export default SearchBar