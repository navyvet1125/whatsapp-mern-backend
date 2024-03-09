import express from 'express';
const router = express.Router();
import userController from '../controllers/user_controller.js';

router.route('/:username')
    .get(userController.read);

router.route('/')
    .get(userController.index);

// router.route('/friends')
//     .get(userController.friends);

export default router;