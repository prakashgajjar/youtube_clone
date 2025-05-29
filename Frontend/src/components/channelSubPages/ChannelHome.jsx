import axios from "axios"
import { useEffect } from "react";
import { useParams } from "react-router-dom"

const ChannelHome = () => {
const { id } = useParams();
const getVideoForYou  = async () => {
    try {
        const response = await axios.post('http://localhost:3000/channel/home/getforyou', {
            id: id
        })
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }

}

useEffect(() => {
    getVideoForYou()
}, [])

  return (
    <div>ChannelHome</div>
  )
}

export default ChannelHome