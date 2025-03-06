const CheackSubscribed = (req,res)=>{
    console.log("subscribed");
    res.status(200).json({message : "Subscribed"});
}

export default CheackSubscribed;