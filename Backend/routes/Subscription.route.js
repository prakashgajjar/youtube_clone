import express from 'express';
import GetSubscription from '../controllers/GetSubscriptions.controller.js'
import Auth from '../middlewares/Auth.middleware.js'
const router = express.Router();

router.get('/',Auth ,GetSubscription);

export default router;

