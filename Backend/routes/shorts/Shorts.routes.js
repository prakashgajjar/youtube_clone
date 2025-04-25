import express from 'express';
import GetAllShorts from '../../controllers/shorts/GetAllShorts.controller.js';
import GetOneShort from '../../controllers/shorts/GetOneShort.controller.js'
const router = express.Router();

router.get('/' ,GetAllShorts);
// router.get('/:id',GetOneShort);

export default router;

