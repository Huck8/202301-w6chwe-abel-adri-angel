import { RequestHandler } from 'express';
import { RobotModel } from './robot-schema.js';

export const createRobotController = () => {};

export const getRobotsController: RequestHandler = async (_req, res) => {
  try {
    const foundRobots = await RobotModel.find({});
    res.json(foundRobots);
  } catch (error) {
    res.status(500).json(error);
  }
};

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
