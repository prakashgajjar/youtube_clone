import express from 'express';
import WatchLater from '../../controllers/watchlater/WatchLater.controller.js'
import WatchLaterAdd from '../../controllers/watchlater/WatchLaterAdd1.controller.js'
import removeWatchLaterVideo from '../../controllers/watchlater/WatchLaterRemove.controller.js';
import authUser from '../../middlewares/Auth.middleware.js';
const router = express.Router();

router.get('/',authUser,WatchLater);
router.post('/add',authUser,WatchLaterAdd);
router.post('/remove',authUser,removeWatchLaterVideo);

export default router;