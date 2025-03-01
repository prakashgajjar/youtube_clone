import React from 'react'

const TagName = ({ name }) => {
    return (
        <div>
            <div>
                <div className=' w-full px-3 py-2 whitespace-nowrap bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition duration-200 delay-50 text-white font-semibold text-sm font-sans'>
                    {name}
                </div>
            </div>
        </div>
    )
}

export default TagName