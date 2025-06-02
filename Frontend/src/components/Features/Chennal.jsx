import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../Hooks/AppContext'
import axios from 'axios';

const Chennal = () => {
    const { setShowCreateChannel, setShowChannel, showChannel, channelExits, setChannelExits, userDetail, channelDetail, setChannelDetail } = useAppContext();
    const getChanelDetail = async () => {
        try {
            const responce = await axios.post('http://localhost:3000/channel/detail',
                {
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            if (responce.status == 201) {
                console.log(responce.data.getChanneDetail);
                setChannelDetail(responce.data.getChanneDetail)
                setChannelExits(true);
            } else {
                console.log("Error getting channel detail");
            }

        } catch (error) {
            console.error(error.message)
        }
    }

    const signOut = async () => {
        try {
            const responce = await axios.post('http://localhost:3000/api/signout',
                {
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            if (responce.status == 201) {
                console.log(responce);
                window.location.reload();
            } else {
                console.log("Error getting channel detail");
            }

        } catch (error) {
            console.error(error.message)
        }
    }
    const navigate = useNavigate();

    useEffect(() => {
        getChanelDetail();
    }, [showChannel, setShowCreateChannel])

    useEffect(() => {
        getChanelDetail();
    }, [])

    return (
        <div className='text-white h-56 w-[300px] bg-[#282828] rounded-xl z-[50]'>
            <div className='flex gap-5 pt-3 ' >
                <div className='ml-3 '>
                    <img src={`http://localhost:3000/banners/${(channelDetail && channelDetail.profilePicture) || "default.jpg"}`} className='w-10 h-10 mt-2 rounded-full' alt="" />
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col '>
                        <h1 className='text-lg font-semibold'>{userDetail.username}</h1>
                        <h1 className='text-sm'>{userDetail.email}</h1>
                    </div>
                    {
                        channelExits ? (
                            <div>
                                <h1 className='text-blue-400 cursor-pointer'
                                    onClick={() => {
                                        setShowChannel(false);
                                        navigate(`/channel/${channelDetail._id}`)
                                    }}
                                >Show channel</h1>
                            </div>
                        ) : (
                            <div>
                                <h1 className='text-blue-400 cursor-pointer'
                                    onClick={() => {
                                        setShowCreateChannel(true);
                                        setShowChannel(false);
                                    }}
                                >Create your channel</h1>
                            </div>
                        )
                    }

                </div>
            </div>
            <hr className='mt-4 opacity-30' />
            <div className='flex gap-4 mt-5 items-center'>
                <div>
                    <img src="logos/signOut.png" className='w-[18px] ml-5' alt="" />
                </div>
                <div onClick={() => {
                    signOut();
                }}>
                    <h1 className='text-md font-sans font-semibold cursor-pointer'>sign out</h1>
                </div>

            </div>
            <hr className='mt-4 opacity-30' />
        </div>
    )
}

export default Chennal