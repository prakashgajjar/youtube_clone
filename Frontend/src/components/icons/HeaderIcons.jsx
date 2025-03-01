import React from 'react'

const HeaderIcons = () => {
    return (
        <div>
            <div className='transition-all duration-300 ease-in-out flex justify-center items-center   hover:bg-white rounded-full  hover:bg-opacity-10 h-10 w-10'>
                <svg className="w-6 h-6 flex flex-col justify-center items-center mr-1 text-white" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="6" x2="24" y2="6" fill='white' />
                    <line x1="4" y1="12" x2="24" y2="12" />
                    <line x1="4" y1="18" x2="24" y2="18" />
                </svg>
            </div>
        </div>
    )
}

export default HeaderIcons