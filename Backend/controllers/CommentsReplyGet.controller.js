import Comment from "../models/Comment.models.js";

const getSubComments = async (req, res) => {
    const { id } = req.body;
    try {
        console.log(id)
        if (!id) {
            return res.status(401).json({ error: "something wrong" })
        }
        const subcommentsget = await Comment.findById(id).populate({
            path: 'subComments',
            populate: { path: 'channel' }
        })
        .exec();
        res.status(200).json({ Message: 'success' ,subcommentsget })
    } catch (error) {
        console.log(error.Message)
        res.status(400).send(error.Message)
    }
}

export default getSubComments;