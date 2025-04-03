import axios from 'axios'

const HistoryVideo = ({video , hId}) => {
  const historyDelet = ()=>{
    try {
      const responce = axios.post('http://localhost:3000/watch/delete',{
        id: hId
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
      if (responce.status === 200) {
        console.log('Video deleted from history successfully');
      }else{
        console.error('Error deleting video from history');
      }

    } catch (error) {
      console.log(error);
    }
}

    return (
        <div className="">
            <div className=" h-[138px] w-[760px] flex justify-between  ">
                <div className="flex gap-4 ">
                    <div className="h-[138px] min-w-[246px]  bg-red-500 rounded-lg">
                    <img className="rounded-lg h-[138px] min-w-[246px]"  src={`http://localhost:3000/images/${video.videoId.thumbnail}`} alt="thumbnail" />
                    </div>
                    <div className="pt-1 w-[514px]">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-xl font-semibold">{video.videoId.tital}</h1>
                            </div>
                            <div className="flex">
                                <div className=" flex hover:bg-white rounded-full  hover:bg-opacity-20 w-10 h-10 items-center  justify-center" onClick={historyDelet}>
                                    <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="24" height="24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none">
                                        <line x1="10" y1="10" x2="90" y2="90" />
                                        <line x1="90" y1="10" x2="10" y2="90" />
                                    </svg>
                                </div>
                                <div className="flex justify-center w-10 h-10 items-center  ">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width="24" height="24" fill="currentColor">
                                        <path d="M64 144c26.5 0 48-21.5 48-48S90.5 48 64 48 16 69.5 16 96s21.5 48 48 48zm0 80c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 176c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <h1 className="text-sm opacity-60">{video.videoId.channel.channelName}</h1>
                            <h1 className="-mt-1">.</h1>
                            <h1 className="text-sm opacity-60">{video.videoId.views} views</h1>
                        </div>
                        <div className="mt-2">
                            <h1 className="text-sm opacity-60 overflow-ellipsis line-clamp-2">{video.videoId.description} </h1>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default HistoryVideo