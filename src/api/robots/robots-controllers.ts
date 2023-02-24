import { RequestHandler } from 'express';
import { RobotModel } from './robot-schema.js';

export const getRobotsController = () => {};

export const createRobotController = () => {};

export const getRobotByIdController = () => {};

export const updateRobotByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const dbRes = await RobotModel.updateOne({ _id: id }, { ...req.body });
    if (dbRes.matchedCount === 0) {
      res.sendStatus(404);
    }

    if (dbRes.modifiedCount === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteRobotByIdController = () => {};
