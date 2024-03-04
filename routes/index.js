import express from 'express';
const router = express.Router();
import indexController from '../controllers/index_controller.js';

router.route('/')
    .get(indexController.index);

export default router;