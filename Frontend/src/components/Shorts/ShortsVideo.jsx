import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Hls from "hls.js";

const ShortsVideo = ({ video }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const { id } = useParams();

  const [muted, setMuted] = useState(false);
  const [play, setPlay] = useState(false);
  const [viewCounted, setViewCounted] = useState(false);
  const [channelInfo, setChannelInfo] = useState(null); // <-- new state for channel details

  // Fetch channel info separately if channel is an ID
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        if (!video?.channel) return;
        // If channel is already an object, no need to fetch again
        if (typeof video.channel === "object") {
          setChannelInfo(video.channel);
          return;
        }
        // Assuming your backend API for channel details:
        const res = await axios.get(`http://localhost:3000/channels/${video.channel}`);
        if (res.status === 200) {
          setChannelInfo(res.data);
        }
      } catch (error) {
        console.error("Error fetching channel info:", error.message);
      }
    };

    fetchChannel();
  }, [video?.channel]);

  const viewsAdd = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/views/add",
        { videoId: id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200 || response.status === 201) {
        console.log("View added:", response.data);
      } else {
        console.error("Error adding view", response);
      }
    } catch (error) {
      console.error("Error adding view:", error.message);
    }
  };

  const handleVideoClick = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (videoEl.paused) {
      setPlay(true);
      videoEl.play();
    } else {
      setPlay(false);
      videoEl.pause();
    }
  };

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!video?.video || !videoEl) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(`http://localhost:3000/hls/${video.video}/master.m3u8`);
      hls.attachMedia(videoEl);
    } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.src = `http://localhost:3000/hls/${video.video}/master.m3u8`;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [video?.video]);

  useEffect(() => {
    const videoEl = videoRef.current;

    const handleTimeUpdate = () => {
      if (videoEl && !viewCounted && videoEl.currentTime >= videoEl.duration / 3) {
        viewsAdd();
        setViewCounted(true);
      }
    };

    videoEl?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoEl?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [viewCounted]);

  return (
    <div className="w-full h-[900px] mb-16 rounded-2xl bg-black flex justify-center items-center">
      <div className="relative aspect-[9/16] h-full max-h-screen rounded-xl overflow-hidden shadow-lg">
        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full "
          loop
          muted={muted}
          onClick={handleVideoClick}
          playsInline
        />

        {/* Controls */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          <button
            className="bg-black h-12 w-12 bg-opacity-15 text-white flex justify-center items-center rounded-full"
            onClick={handleVideoClick}
          >
            {play ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            className="bg-black h-12 w-12 bg-opacity-15 text-white flex justify-center items-center rounded-full"
            onClick={() => setMuted(!muted)}
          >
            {muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-3 top-1/3 z-10 flex flex-col gap-6 items-center text-white">
          <ActionIcon icon="like" count={video?.likes?.length || 0} />
          <ActionIcon icon="dislike" label="Dislike" />
          <ActionIcon icon="comment" count={video?.comments?.length || 0} />
          <ActionIcon icon="share" label="Share" />
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img
              src={`http://localhost:3000/banners/${channelInfo?.profilePicture || "default.jpg"}`}
              alt="channel"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-bold">{channelInfo?.channelName || "Unknown Channel"}</span>
            <button className="text-sm bg-white text-black px-3 py-1 rounded-full ml-2">
              Subscribe
            </button>
          </div>
          <p className="text-[16px] font-medium line-clamp-2">{video?.description}</p>
        </div>
      </div>
    </div>
  );
};

const ActionIcon = ({ icon, count, label }) => {
  const iconSrc = {
    like: "/logos/like.png",
    dislike: "/logos/like.png",
    comment: "/logos/comments1.png",
    share: "/logos/share.png",
  };

  return (
    <div className="flex flex-col items-center">
      <button className="bg-black bg-opacity-25 w-12 h-12 flex justify-center items-center rounded-full">
        <img
          className={`w-6 h-6 ${icon === "dislike" ? "rotate-180" : ""}`}
          src={`http://localhost:5173${iconSrc[icon]}`}
          alt={icon}
        />
      </button>
      <span className="text-sm mt-1">{count || label}</span>
    </div>
  );
};

export default ShortsVideo;
