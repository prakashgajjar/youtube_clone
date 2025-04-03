import express from 'express';
import WatchLater from '.././controllers/WatchLater.controller.js'
import WatchLaterAdd from '../controllers/WatchLaterAdd1.controller.js'
import authUser from '../middlewares/Auth.middleware.js';
const router = express.Router();

router.post('/',authUser,WatchLater);
router.post('/add',authUser,WatchLaterAdd);

export default router;