import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Hooks/AppContext'
import axios from 'axios';

const SearchBar = () => {
  const { setVideoData, videoData } = useAppContext();
  const [search, setSearch] = useState('');

  const suggetionsOfVodes = async () => {
    const responce = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search || "songs"}&type=video&maxResults=30&key=AIzaSyBAQ093QIbEtavBUqLcyY7K9KQjl7UqHJY`)
    if (responce) {
      setVideoData(responce.data.items);
    }
    console.log(videoData)
  }
  useEffect(() => {
    suggetionsOfVodes();
  }, [])

  return (
    <div onKeyDown={(event) => {
      if (event.key === 'Enter') {
        suggetionsOfVodes();
      }
    }}>
      <div className='flex'>
        <div className=''>
          <input type="text" className='outline-1 outline-blue-800 focus:outline  text-white border-opacity-10  bg-zinc-900 pl-4 rounded-l-full border border-white w-[530px] h-10'
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className=' w-16 ml-[1px]  border-t border-b border-e border-white bg-[#222222] border-opacity-10 flex justify-center items-center rounded-r-full h-10' >
          <img src="logos/search.png" className='w-[24px]' alt=""
            onClick={() => {
              // suggetionsOfVodes();
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar