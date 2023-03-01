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

export const updateRobotByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const robot = await RobotModel.updateOne(
      { _id: id },
      { ...req.body },
    ).exec();
    if (robot.matchedCount === 0) {
      res.sendStatus(404);
    }

    if (robot.modifiedCount === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteRobotByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const robot = await RobotModel.deleteOne({ _id: id }).exec();
    if (robot.deletedCount === 0) {
      res.sendStatus(404);
    } else {
      res.status(204);
      res.json({ id });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
