import express from 'express';
import WatchHistory from '../controllers/WatchHistory.controller.js';
import AuthUser from '../middlewares/Auth.middleware.js';
import watchHistoryGet from '../controllers/WatchHistoryGet.controller.js';
import WatchHistoryUpadate from '../controllers/WatchHistoryDelete.controller.js';
const router = express.Router();

router.post('/add',AuthUser,WatchHistory);
router.get('/get',AuthUser,watchHistoryGet);
router.post('/delete',AuthUser,WatchHistoryUpadate);

export default router;