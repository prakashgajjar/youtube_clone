import moment from "moment";
import {useNavigate} from 'react-router-dom'

const SearchVideo = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="flex  text-white rounded-lg overflow-hidden w-[1280px] mx-auto p-2  cursor-pointer ">

      <div className="w-[500px] h-[280px] relative" onClick={()=>{
        navigate(`/video/${data._id}`); 
      }}>
        <img
          src={`http://localhost:3000/images/${data.thumbnail}`}
          alt="Video Thumbnail"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute bottom-1 right-1  bg-opacity-80 text-xs px-1 py-0.5 rounded bg-zinc-800  ">
          2:26
        </div>
      </div>

      <div className="ml-4 flex flex-col gap-2 py-1">
        <div>
          <h3 className="text-sm md:text-base w-[700px]  font-semibold leading-tight line-clamp-2" onClick={()=>{
           navigate(`/video/${data._id}`);

          }}>
            {data.tital}
          </h3>
          <div className="text-gray-400 text-sm mt-1">{data.views} views • {moment(data.createdAt).fromNow()}</div>
        </div>
        <div className="flex items-center  gap-2 text-gray-400 text-sm mt-2" onClick={()=>{
           navigate(`/channel/${data.channel._id}`);
        }}>
          <img
            src={`http://localhost:3000/banners/${data.channel.profilePicture}`}
            alt="T-Series"
            className="w-6 h-6 rounded-full"
          />
          <span className="">{data.channel.channelName}</span>
        </div>
        <div>
          <h3 className="w-[700px] line-clamp-1 text-gray-400 text-sm mt-1">
            {`${data.description}...`}
          </h3>

        </div>
      </div>
    </div>
  )
}

export default SearchVideo