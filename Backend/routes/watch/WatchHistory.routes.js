import express from 'express';
import WatchHistory from '../../controllers/watchhistory/WatchHistory.controller.js';
import watchHistoryGet from '../../controllers/watchhistory/WatchHistoryGet.controller.js';
import WatchHistoryUpadate from '../../controllers/watchhistory/WatchHistoryDelete.controller.js';
import AuthUser from '../../middlewares/Auth.middleware.js';
const router = express.Router();

router.post('/add',AuthUser,WatchHistory);
router.get('/get',AuthUser,watchHistoryGet);
router.post('/delete',AuthUser,WatchHistoryUpadate);

export default router;