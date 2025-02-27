import express from 'express';
import SignUp from '../controllers/SignUp.controller.js'
import SignIn from '../controllers/SignIn.controller.js';
import SignOut from '../controllers/SignOut.controller.js';

const router = express.Router();

router.post('/signup',SignUp);
router.post('/signin',SignIn);
router.post('/signout',SignOut);

export default router;