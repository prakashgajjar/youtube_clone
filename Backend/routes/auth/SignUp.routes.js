import express from 'express';
import SignUp from '../../controllers/auth/SignUp.controller.js'
import SignIn from '../../controllers/auth/SignIn.controller.js';
import SignOut from '../../controllers/auth/SignOut.controller.js';

const router = express.Router();

router.post('/signup',SignUp);
router.post('/signin',SignIn);
router.post('/signout',SignOut);

export default router;