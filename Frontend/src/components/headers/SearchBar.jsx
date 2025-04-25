import  { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate  = useNavigate();
  const params = new URLSearchParams(location.search);
  const query1 = params.get('query');

  useEffect(()=>{
    setQuery(query1)
  },[])

  return (
    <div >
      <div className='flex'>
        <div className=''>
          <input type="text" className='outline-1 outline-blue-800 focus:outline  text-white border-opacity-10  bg-zinc-900 pl-4 rounded-l-full border border-white w-[530px] h-10'
            placeholder='Search'
            value={query }
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key === 'Enter' && query.length > 0){
                navigate(`/results/search?query=${query}`)
              }
            }}
          />
        </div>
        <div className=' w-16 ml-[1px]  border-t border-b border-e border-white bg-[#222222] border-opacity-10 flex justify-center items-center rounded-r-full h-10' >
          <img src="http://localhost:5173/logos/search.png" className='w-[24px]' alt=""
            onClick={() => {
              navigate(`/results/search?query=${query}`)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar