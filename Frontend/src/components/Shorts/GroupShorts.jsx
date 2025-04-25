import ShortsVideo from './ShortsVideo';
import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GroupShorts = () => {
    const [shorts, setShorts] = useState([]);
    const [page, setPage] = useState(0); // for pagination
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const observer = useRef();

    const fetchShorts = async (pageNum) => {
        try {
            const res = await axios.get(`http://localhost:3000/shorts?id=${pageNum}&limit=5`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            if (res.data.video.length === 0) {
                setHasMore(false); 
                return;
            }
            setShorts(prev => [...prev, ...res.data.video]);
            if (pageNum === 0 && res.data.video.length > 0) {
                navigate(`/shorts/${res.data.video[0]._id}`);
            }
        } catch (err) {
            console.error("Error loading shorts", err.message);
        }
    };

    useEffect(() => {
        fetchShorts(page);
    }, [page]);

    // intersection observer callback
    const lastVideoRef = useCallback((node) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]);

    return (
        shorts && <div className="w-screen h-screen flex justify-center custom-scroll overflow-hidden">
            <div
                className="h-screen overflow-y-scroll main scroll-snap-y snap-mandatory"
            >
                <div>
                    {shorts.map((data, key) => {
                        const isSecondLast = key === shorts.length - 2;
                        return (
                            <div
                                key={key}
                                className="h-screen snap-start"
                                ref={isSecondLast ? lastVideoRef : null}
                            >
                                <ShortsVideo video={data} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default GroupShorts;
