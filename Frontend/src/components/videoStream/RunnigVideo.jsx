import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Hls from 'hls.js';

const RunningVideo = () => {
  const { id } = useParams();
  const videoRef = useRef();


  const viewsAdd = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/views/add',
        { videoId: id },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      if (response.status === 200 || response.status === 201) {
        console.log('View added:', response.data);
      } else {
        console.error('Error adding view', response);
      }
    } catch (error) {
      console.error('Error adding view:', error.message);
    }
  };

  const videoDataGet = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/videos/detail`,
        { videoId: id },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (response.status === 200 || response.status === 201) {
        setVideoUrl(response.data.video);
        console.log('Video data retrieved:', response.data);
      } else {
        console.error('Error retrieving video data', response);
      }
    } catch (error) {
      console.error('Error retrieving video data:', error.message);
    }
  };

  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(-1); // -1 means auto
  const [videoUrl, setVideoUrl] = useState(null);
  const hlsRef = useRef(null);
  const [show, setShow] = useState(false);
  // const [buffering, setBuffering] = useState(false);
  const [viewCounted, setViewCounted] = useState(false);

  useEffect(() => {
    videoDataGet();
  }, []);

  useEffect(() => {
    if (!videoUrl) return;

    const video = videoRef.current;
    const hls = new Hls();
    const playlist = `http://localhost:3000/hls/${videoUrl}/master.m3u8`;

    hlsRef.current = hls;
    hls.loadSource(playlist);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      setLevels(hls.levels);
      setCurrentLevel(hls.currentLevel);
    });

    hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
      setCurrentLevel(data.level);
    });


    return () => {
      hls.destroy();
    };
  }, [videoUrl]);


useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (video && !viewCounted && video.currentTime >= video.duration / 3) {
        viewsAdd(); 
        setViewCounted(true); 
      }
    };

    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [viewCounted]);

 const handleQualityChange = (e) => {
  const level = parseInt(e.target.value);
  const video = videoRef.current;

  if (!hlsRef.current || !video) return;

  // 1. Pause video
  video.pause();
  // setBuffering(true);
  setCurrentLevel(level);

  // 2. Switch quality
  hlsRef.current.currentLevel = level;

  // 3. Resume after buffer comes
  const onBufferAppended = () => {
    hlsRef.current.off(Hls.Events.BUFFER_APPENDED, onBufferAppended);
    // setBuffering(false);
    video.play();
  };

  hlsRef.current.on(Hls.Events.BUFFER_APPENDED, onBufferAppended);
};


  return (
    <div className="z-50">
      <div className="w-[1280px] h-[720px] rounded-2xl">
        <video
          ref={videoRef}
          controls
          style={{ width: "100%", height: "100%" }}
          className="rounded-2xl"
        >
          Your browser does not support the video tag.
        </video>

        <div className="relative -mt-16 -ml-24  left-[15rem] z-50  bg-opacity-50 p-1 flex items-center gap-2 rounded-md">
          <img
            src="/logos/setting.png"
            alt="Settings"
            className="w-5 h-5 cursor-pointer"
            onClick={() => setShow((prev) => !prev)} // toggle visibility
          />

          {show && (
            <select
              id="quality"
              value={currentLevel}
              onChange={handleQualityChange}
              className="bg-black text-white text-sm border border-gray-600 rounded px-1 "
            >
              <option value={-1}>Auto</option>
              {levels.map((level, i) => (
                <option key={i} value={i}>
                  {level.height}p
                </option>
              ))}
            </select>

          )}
        </div>

      </div>
    </div>
  );
};

export default RunningVideo;
