
import Comment from './Comment'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const GroupComment = () => {
  const { id } = useParams();

  const getComment = async () => {
    try {
      const responce = await axios.post('http://localhost:3000/comments/get',
        {
          videoId: id
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
      // console.log(responce.data.Comments[0]);
      if (responce.status == 200) {
        setComments(responce.data.Comments)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
   const getCommentReply = async (comment)=>{
    setLiveComment(comment._id)
          try {
              const responce = await axios.post("http://localhost:3000/comments/getreply",  {
                  id:comment._id,
                },
                {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
                })
                // console.log(responce.data.subcommentsget.subComments);
                setSubComments(responce.data.subcommentsget.subComments);
          } catch (error) {
              console.error(error.message);
          }
  
      }
  const [comments, setComments] = useState([])
  const [subComments, setSubComments] = useState([])
  const [showSubComment , setShowSubComments] = useState(false)
  const [liveComment , setLiveComment] = useState('')

  useEffect(() => {
     getComment();
  }, [])

  useEffect(()=>{
     getComment();
  },[id])

  return (
    <div>
      <div className='flex flex-col gap-4 last:pb-32'>
        {
          comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index}>
                <div>
                  <Comment comment={comment} />
                </div>
                <div onClick={()=>{
                  getCommentReply(comment);
                  setShowSubComments(!showSubComment)
                }} className='text-blue-500 ml-8 cursor-pointer font-semibold h-8 flex justify-center items-center mt-2 max-w-32 hover:rounded-full hover:bg-blue-400 hover:bg-opacity-25  '>
                  <h1 className='flex gap-2'> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 16.5l-6-6 1.4-1.4L12 13.7l4.6-4.6 1.4 1.4z" />
                  </svg> replyes</h1>
                </div>

                <div className=' mt-3'>
                  {
                   subComments && comment._id==liveComment && showSubComment && subComments.length > 0 && subComments.map((subcomment, index) => (
                      <div className='text-sm scale-90' key={index}>
                        <Comment comment={subcomment} />
                      </div>
                    ))
                  }
                </div>

              </div>
            ))
          ) : (
            <h1></h1>
          )
        }
      </div>
    </div>
  )
}

export default GroupComment