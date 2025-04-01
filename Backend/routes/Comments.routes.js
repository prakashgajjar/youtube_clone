import express from "express";
import CommentAdd from "../controllers/CommentsAdd.controller.js";
import GetComments from "../controllers/CommentsGet.controller.js";
import Reply from '../controllers/CommentsReply.controller.js';
import GetSubComments from "../controllers/CommentsReplyGet.controller.js"
import AuthUser from "../middlewares/Auth.middleware.js";
const router = express.Router();

router.post('/send',AuthUser,CommentAdd);
router.post('/get',GetComments);
router.post('/sendreply',AuthUser,Reply);
router.post('/getreply',GetSubComments);


export default router;