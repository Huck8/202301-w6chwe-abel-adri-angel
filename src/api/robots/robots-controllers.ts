import { RequestHandler } from 'express';
import { RobotModel } from './robot-schema.js';
import crypto from 'node:crypto';


export const getRobotsController: RequestHandler = async (_req, res) => {
  try {
    const foundRobots = await RobotModel.find({});
    res.json(foundRobots);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createRobotController: RequestHandler = async (req, res) => {
  const id = crypto.randomUUID();
  const transformer = {
    id,
    ...req.body,
  };
  try {
    await RobotModel.create(transformer);
    res.status(201).json(transformer);
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

export const updateRobotByIdController = () => {};

export const deleteRobotByIdController = () => {};
