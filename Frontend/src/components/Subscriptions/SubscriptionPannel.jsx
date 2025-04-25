
const SubscriptionPannel = ({channel}) => {

  return (
        <div>
        <div className='flex  h-9 w-[185px] justify-between items-center cursor-pointer rounded-lg hover:bg-opacity-10  hover:bg-white'>
              <div className="flex gap-5">
              <div className='ml-2'>
            <img className="w-6 h-6 rounded-full bg-red-500" src={`http://localhost:3000/banners/${channel.profilePicture}`} alt="" />
            </div>
            <div>
            <h1 className="">{channel.channelName}</h1>
            </div>
              </div>
            <div className="text-xl text-blue-600 -mt-2 ">.</div>
        </div>  
    </div>
  )
}

export default SubscriptionPannel