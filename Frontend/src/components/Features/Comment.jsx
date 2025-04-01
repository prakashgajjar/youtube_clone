
import { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import { useParams } from 'react-router-dom';


const Comment = ({ comment }) => {
    const {id} = useParams();

    const sendComment = async ()=>{
        try {
            const responce = await axios.post("http://localhost:3000/comments/sendreply",  {
                videoId: id,
                id:comment._id,
                comment : inputText
              },
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
              })
              console.log(responce);
        } catch (error) {
            console.error(error.message);
        }

    }


    const [showInput, setShowInput] = useState(false);
    const [inputText , setInputText] = useState("");
    return (
        <div>
            <div className='flex gap-2 '>
                <div>
                    <img src="" alt="Logo" className='w-10 h-10 rounded-full bg-red-400' />
                </div>
                <div className='flex flex-col justify-start ml-2'>
                    <div className='flex gap-2'>
                        <h1 className='text-sm font-semibold'>{comment.channel.channelName}</h1>
                        <h1 className='text-sm font-semibold text-white opacity-35'>{moment(comment.createdAt).fromNow()}</h1>
                    </div>
                    <div>
                        <h1 className='text-[16px]  font-sarif'>{comment.comment} </h1>
                    </div>
                    {/*like dislike and comments start here */}
                    <div className='mt-2'>
                        <div>
                            <div className='flex gap-5 items-center '>
                                <div className='flex gap-2'>
                                    <img src="logos/likeV.png" alt="like" className='w-[22px] h-[22px]' />
                                    <h1>{comment.likes}</h1>
                                </div>
                                <div>
                                    <img src="logos/likeV.png" alt="dislike" className='rotate-180 w-[22px] h-[22px]' />
                                </div>
                                <div className='flex justify-center items-center cursor-pointer w-14 h-7 hover:bg-white hover:bg-opacity-15 hover:rounded-full' onClick={() => {
                                    setShowInput(true);
                                }}>
                                    <h1 className='text-sm font-semibold'>Reply</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* input field is here  */}
            {
                showInput &&

                <div className='flex flex-col ml-14 mt-1 relative'>
                    <div className='flex'>
                        <img src="" alt="" className='bg-red-600 w-[22px] h-[22px] rounded-full' />

                        <div className="relative w-full ml-4">
                            <input
                                type="text"
                                name="comment"
                                className='w-full bg-transparent border-b-[1px] border-opacity-35 border-white focus:outline-none  transition-all duration-300 peer'
                                value={inputText}
                                onChange={(e)=>{
                                    setInputText(e.target.value);
                                    
                                }}
                            />
                            <span className="absolute left-1/2 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 peer-focus:left-0 peer-focus:w-full"></span>
                        </div>
                    </div>
                    <div className='flex justify-end mt-2 relative gap-1 '>
                        <div className='cursor-pointer mt-1 hover:bg-white hover:bg-opacity-30 hover:rounded-full h-8 w-20 flex justify-center items-center ' onClick={() => {
                            setShowInput(false);
                        }}>
                            <h1>Cancel</h1>
                        </div>
                        <div className={` cursor-pointer mt-1  hover:bg-opacity-30 hover:rounded-full h-8 w-[85px] flex justify-center items-center ${inputText.length >=1 ? "hover:bg-white" : "text-zinc-600 "}`} onClick={() => {
                           {
                            if(inputText.length >0){
                                sendComment();
                                setInputText("");
                            }
                           }   
                        }}>
                            <h1>Comment</h1>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Comment