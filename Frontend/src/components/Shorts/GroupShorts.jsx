import ShortsVideo from './ShortsVideo';
import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GroupShorts = () => {
  const [shorts, setShorts] = useState([]);
  const observer = useRef(null);

  // Fetch all shorts once

  const {id} = useParams

  useEffect(() => {
  const fetchShorts = async () => {
    try {
      const res = id
        ? await axios.get(`http://localhost:3000/shorts/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          })
        : await axios.get('http://localhost:3000/shorts', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          });

      setShorts(res.data?.video || []);
    } catch (err) {
      console.error('Error loading shorts', err.message);
    }
  };

  fetchShorts();
}, [id]);


  // Observer for updating URL when video is visible
  const observeVideos = useCallback(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute('data-id');

          if (entry.intersectionRatio >= 0.5 && videoId) {
            window.history.replaceState(null, '', `/shorts/${videoId}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll('.video-container');
    elements.forEach((el) => observer.current.observe(el));
  }, []);

  useEffect(() => {
    if (shorts.length > 0) {
      observeVideos();
    }

    return () => observer.current?.disconnect();
  }, [shorts, observeVideos]);

  return (
   <div className="w-screen h-screen flex justify-center">
      <div
        className="h-screen overflow-y-scroll scroll-snap-y snap-mandatory custom-scroll"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {shorts.map((video) => (
          <div
            key={video._id}
            data-id={video._id}
            className="video-container h-screen snap-start"
          >
            <ShortsVideo video={video} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupShorts;
