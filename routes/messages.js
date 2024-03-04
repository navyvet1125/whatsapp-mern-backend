import express from 'express';
const router = express.Router();
import messageController from '../controllers/message_controller.js';

router.route('/sync')
    .get(messageController.sync);

router.route('/new')
    .post(messageController.create);

export default router;