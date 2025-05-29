import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import qualityLevels from 'videojs-contrib-quality-levels';
import 'videojs-http-streaming';
import { useEffect, useRef } from 'react';
videojs.registerPlugin('qualityLevels', qualityLevels);

const VideoPlayer = ({ src }) => {
  const videoRef = useRef();

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      fluid: true,
      sources: [{ src, type: 'application/x-mpegURL' }],
    });

    // You can customize quality selector UI here or use plugins like videojs-http-source-selector

    return () => {
      if (player) player.dispose();
    };
  }, [src]);

  return (
    <div>
      <video ref={videoRef} className="video-js vjs-default-skin" />
    </div>
  );
};

export default VideoPlayer;
