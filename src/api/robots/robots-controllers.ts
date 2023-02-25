import { RequestHandler } from 'express';
import crypto from 'node:crypto';
import { RobotModel } from './robot-schema.js';

export const getRobotsController = () => {};

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

export const getRobotByIdController = () => {};

export const updateRobotByIdController = () => {};

export const deleteRobotByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const robot = await RobotModel.findById(id);
    if (robot === null) {
      res.sendStatus(404);
    }

    RobotModel.deleteOne(robot?.id);
    res.status(204).json(robot?.id);
  } catch (error) {
    res.status(500).json(error);
  }
};
