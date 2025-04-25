import axios from "axios";


const Options = ({ video, value , isWatchlaterPage=false }) => {
    const addVideoInWatchLater = async (id) => {
        try {
            const responce = await axios.post('http://localhost:3000/watchlater/add',
                {
                    id: id
                }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (responce.status === 200) {
                console.log(responce.data)
            } else {
                console.error('Error fetching videos', responce.message)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const removeVideoFromWatchLater = async (id) => {
        try {
            const responce = await axios.post('http://localhost:3000/watchlater/remove',
                {
                    id: id
                }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (responce.status === 200) {
                console.log(responce.data)
            } else {
                console.error('Error fetching videos', responce.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addVideoReport = async (id) => {
        try {
            const responce = await axios.post('http://localhost:3000/video/report',
                {
                    videoId: id
                }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (responce.status === 200) {
                console.log(responce.data)
            } else {
                console.error('Error fetching videos', responce.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {isWatchlaterPage ? (
                <div className="hover:bg-gray-100 hover:bg-opacity-20 px-4 py-2 cursor-pointer text-sm font-medium  rounded-t-lg" onClick={() => {
                    removeVideoFromWatchLater(video._id);
                    value(false)
                }}>
                    Remove
                </div>
            ) : (
                <div className="hover:bg-gray-100 hover:bg-opacity-20 px-4 py-2 cursor-pointer text-sm font-medium  rounded-t-lg" onClick={() => {
                    addVideoInWatchLater(video._id);
                    value(false)
                }}>
                    Watch later
                </div>

            )}

            <div className="hover:bg-gray-100 hover:bg-opacity-20 px-4 py-2 cursor-pointer text-sm font-medium rounded-b-lg" onClick={() => {
                addVideoReport(video._id);
                value(false)
            }}>
                Report
            </div>
        </div>
    )
}

export default Options