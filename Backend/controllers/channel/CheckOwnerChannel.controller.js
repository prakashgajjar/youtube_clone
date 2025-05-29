import Channel from "../../models/Channel.models.js"
const checkowner = async (req, res) => {
const {id} = req.body;
try {
    const channel = await Channel.findById(id)
    if(!channel){
        return res.status(404).json({message : "No channel found" , state : false  })
    }
    if(channel.userId.toString() === req.user.id.toString()){
        return res.status(201).json({message : "Owner" , state : true})
    } else{
        return res.status(403).json({message : "Not authorized" , state : false  })
    }
    
} catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message , state : false  });
}
}

export default checkowner;