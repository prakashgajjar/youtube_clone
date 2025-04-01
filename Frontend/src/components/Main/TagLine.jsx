import  { useRef } from 'react';
import TagName from '../components/TagName';

const TagLine = () => {
    const scrollRef = useRef(null);

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-[1630px]">
            {/* Scrollable Tag Container */}
            <div 
                ref={scrollRef} 
                className="flex gap-2 overflow-x-auto custom-scroll scrollbar-hide w-full"
            >
                <TagName name="Node.js" />
                <TagName name="React-Router" />
                <TagName name="Data Structure" />
                <TagName name="AI" />
                <TagName name="Music" />
                <TagName name="Gaming" />
                <TagName name="Live" />
                <TagName name="Comedy" />
                <TagName name="Technology" />
                <TagName name="Education" />
                <TagName name="Science" />
                <TagName name="Programming" />
                <TagName name="Web Development" />
                <TagName name="Python" />
                <TagName name="Java" />
                <TagName name="Machine Learning" />
                <TagName name="Cybersecurity" />
                <TagName name="Blockchain" />
                <TagName name="Space" />
            </div>

            {/* Gradient Effect */}
            <div className="absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-zinc-800 to-transparent pointer-events-none" />

            {/* Scroll Button */}
            <button 
                onClick={scrollRight} 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl opacity-70 text-white rounded-full bg-zinc-800 hover:bg-zinc-700 transition duration-300 outline-none focus:outline-none border-none px-3 py-1"
            >
                &gt;
            </button>
        </div>
    );
};

export default TagLine;
