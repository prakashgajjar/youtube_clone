import Channel from "../../models/Channel.models.js";
const uploadprofile = async (req,res) =>{
    try {
        const file = await req.file;
        const {id} = req.body;
        if(!id){
            return res.status(400).json({message : "No id provided"})
        }
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const channel = await Channel.findByIdAndUpdate(id, {profilePicture: file.filename}, {new: true});
        if(!channel){
            return res.status(404).json({message : "Channel not found"})
        }

        res.status(200).json({ message: "Banner updated successfully", channel});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
    console.log("upload banner");
}

export default uploadprofile;