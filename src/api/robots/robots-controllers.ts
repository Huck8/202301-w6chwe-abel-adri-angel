import { RequestHandler } from 'express';
import { RobotModel } from './robot-schema.js';

export const getRobotsController: RequestHandler = async (_req, res) => {
  try {
    const foundRobots = await RobotModel.find({});
    res.json(foundRobots);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createRobotController = () => {};

export const getRobotByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const robot = await RobotModel.findById(id);

    if (robot === null) {
      res.sendStatus(404);
    } else {
      res.json(robot);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateRobotByIdController = () => {};

export const deleteRobotByIdController = () => {};
