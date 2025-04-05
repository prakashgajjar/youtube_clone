import { useState,useEffect } from 'react'
import { useAppContext } from '../../Hooks/AppContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const InputComment = () => {
    const { id } = useParams();
    const SendComment = async () => {
        try {
            const responce = await axios.post('http://localhost:3000/comments/send',
                {
                    videoId: id,
                    comment: inputText
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })

            console.log(responce)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getChannelDetail = async () => {
        try {
            const responce = await axios.post('http://localhost:3000/channel/detail',
                {
                
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
                    console.log(responce)
                    setData(responce.data.getChanneDetail);
                
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getChannelDetail();
        console.log("that a data :" , data)
    },[])

    const [data, setData] = useState(null);
    const { inputText, setInputText } = useAppContext();
    return (
        <div>
            <div>
                <h1 className='text-2xl font-bold'>266 Comments</h1>
            </div>
            <div className='flex mt-6'>
                <img src={`http://localhost:3000/images/${data && data.profilePicture}`} alt="" className='bg-red-600 w-10 h-10 rounded-full' />

                <div className="relative w-full ml-4">
                    <input
                        type="text"
                        name="comment"
                        value={inputText}
                        className='w-full bg-transparent border-b-[1px] border-white border-opacity-35 focus:outline-none transition-all duration-300 peer placeholder:text-gray-400'
                        onChange={(e) => {
                            setInputText(e.target.value)
                        }}
                    />

                    <span className="absolute left-1/2 bottom-0 w-0 h-[1px] top-[22px] bg-white transition-all duration-300 peer-focus:left-0 peer-focus:w-full"></span>
                </div>
            </div>
            <div onClick={() => {
                SendComment();
                setInputText('');
            }}>
                <h1 className='relative ml-[1180px] flex justify-center items-center  w-24 h-9 hover:bg-white hover:bg-opacity-15 hover:rounded-full cursor-pointer'  >Comment</h1>
            </div>
        </div>

    )
}

export default InputComment