import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX} from "lucide-react";
// import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const ShortsVideo = ({video}) => {
    const videoRef = useRef()
    const [muted, setMuted] = useState(false)
    const [play, setPlay] = useState(false)
    const handleVideoClick = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            setPlay(true);
            video.play();
        } else {
            setPlay(false);
            video.pause();
        }
    };
    return (
        <div className="w-full h-[900px]  mb-16 rounded-2xl bg-black flex justify-center items-center">
            <div className="relative aspect-[9/16] h-full max-h-screen rounded-xl overflow-hidden shadow-lg">
                {/* Video */}
                <video
                    ref={videoRef}
                    src="http://localhost:5173/intro.mp4"
                    className="w-full h-full object-cover"
                    loop
                    muted={muted}
                    onClick={handleVideoClick}
                />

                {/* Controls (Top Left) */}
                <div className="absolute top-3 left-3 flex gap-2 z-10">
                    <button className="bg-black h-12 w-12 bg-opacity-15 text-white flex justify-center items-center rounded-full" onClick={handleVideoClick}>
                        {
                            play ? (
                                <Pause className="w-6 h-6 text-white" />
                            ) : (
                                <Play className="w-6 h-6 text-white" />
                            )
                        }
                    </button>
                    <button className="bg-black h-12 w-12 bg-opacity-15 text-white flex justify-center items-center rounded-full" onClick={() => {
                        setMuted(!muted)
                    }}>
                        {
                            muted ? (
                                <VolumeX className="w-6 h-6 text-white" />
                            ) : (
                                <Volume2 className="w-6 h-6 text-white" />
                            )
                        }
                    </button>
                </div>

                {/* Actions (Right Side) */}
                <div className="absolute right-3 top-1/3 z-10 flex flex-col gap-6 items-center text-white">
                    <div className="flex flex-col items-center">
                        <button className="bg-black bg-opacity-25 w-12 h-12 flex justify-center items-center    rounded-full">
                            <img className="w-6 h-6" src="http://localhost:5173/logos/like.png" alt=""  />
                        </button>
                        <span className="text-sm mt-1">{video.likes}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <button className="bg-black bg-opacity-25 w-12 h-12 flex justify-center items-center  rounded-full">
                        <img className="rotate-180" src="http://localhost:5173/logos/like.png" alt=""  />
                        </button>
                        <span className="text-sm mt-1">Dislike</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <button className="bg-black bg-opacity-25 w-12 h-12 flex justify-center items-center  rounded-full">
                        <img className="" src="http://localhost:5173/logos/comments1.png" alt=""  />
                        </button>
                        <span className="text-sm mt-1">89</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <button className="bg-black bg-opacity-25 w-12 h-12 flex justify-center items-center  rounded-full">
                        <img className="w-6 h-6" src="http://localhost:5173/logos/share.png" alt=""  />
                        </button>
                        <span className="text-sm mt-1">Share</span>
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 gap-3 flex flex-col mb-2 text-white  p-4 z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <img
                            src={`http://localhost:3000/banners/default.jpg`}
                            alt="channel"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="text-md font-bold">@prakash</span>
                        <button className="text-sm bg-white text-black px-3 py-1 font-medium rounded-full ml-2">
                            Subscribe
                        </button>
                    </div>
                    <p className="text-[16px] font-medium overflow-ellipsis line-clamp-2">
                        Main tere main tere kadmo Mein rakh du yeh jahaan | Zara sa | jannat | KK | #shorts #love #status
                    </p>
                    <p className="text-sm font-semibold text-gray-300 mt-1">🎵 Zara Sa - Pritam & KK</p>
                </div>
            </div>
        </div>
    );
};

export default ShortsVideo;
