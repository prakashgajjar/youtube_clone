
import History from '../../models/History.models.js';

const watchHistory = async (req, res) => {
    const { id} = req.body;
    if (!id) {
        return res.status(400).json({ message: "Please provide id" })
    }
    try {

        const historyVideoDelete = await History.findOneAndDelete({_id : id})
        console.log(historyVideoDelete)
        if(!historyVideoDelete){
            return res.status(404).json({message : 'Video not found in watchHistory'});
        }
            return res.status(200).json({ "message": "delete successfuly" });
        }
     catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" })
    }

}

export default watchHistory;