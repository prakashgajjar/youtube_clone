import ListComponent from '../components/ListComponent'
import {  useNavigate } from 'react-router-dom';

const GroupList1 = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col gap-1'>
            <div onClick={()=>{
                navigate('/');
            }}>
                <ListComponent url="logos/home.png" name="Home" />
            </div>
            <div onClick={()=>{
                navigate('/api/shorts');
            }}>
                <ListComponent url="logos/shorts.png" name="Shorts" />
            </div>
            <div onClick={()=>{
                navigate('/api/subscriptions');
            }}>
                <ListComponent url="logos/subscription.png" name="Subscription" />
            </div>
            <div>
                <hr className='mt-4 opacity-20' />
            </div>
            <div className='gap-1 flex flex-col mt-4'>
                <div onClick={() => {
                    navigate('/history');
                }}>
                    <ListComponent url="logos/history.png" name="History" />
                </div>
                <div onClick={() => {
                    navigate('/myvideos');
                }}>
                    <ListComponent url="logos/your_video.png" name="Your videos" />
                </div>
                <div onClick={() => {
                    navigate('/watchLater');
                }}>
                    <ListComponent url="logos/watch_later.png" name="Watch later" />
                </div>
                <div onClick={()=>{
                    navigate('/likedVideos');
                }}>
                    <ListComponent url="logos/like.png" name="Liked videos" />
                </div>
            </div>
        </div>
    )
}

export default GroupList1