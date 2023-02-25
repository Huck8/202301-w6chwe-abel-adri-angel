import express from 'express';
import {
  createRobotController,
  deleteRobotByIdController,
  getRobotByIdController,
  getRobotsController,
  updateRobotByIdController,
} from './robots-controllers.js';

const router = express.Router();

router.route('/').get(getRobotsController).post(createRobotController);

router
  .route('/:id')
  .get(getRobotByIdController)
  // .patch(updateRobotByIdController)
  .put(updateRobotByIdController)
  .delete(deleteRobotByIdController);

export default router;
