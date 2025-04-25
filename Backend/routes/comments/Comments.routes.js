import express from "express";
import CommentAdd from "../../controllers/comments/CommentsAdd.controller.js";
import GetComments from "../../controllers/comments/CommentsGet.controller.js";
import Reply from '../../controllers/comments/CommentsReply.controller.js';
import GetSubComments from "../../controllers/comments/CommentsReplyGet.controller.js"
import AuthUser from "../../middlewares/Auth.middleware.js";
const router = express.Router();

router.post('/send',AuthUser,CommentAdd);
router.post('/get',GetComments);
router.post('/sendreply',AuthUser,Reply);
router.post('/getreply',GetSubComments);


export default router;