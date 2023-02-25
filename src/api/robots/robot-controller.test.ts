import { Request, Response } from 'express';
import { RobotModel } from './robot-schema';
import {
  createRobotController,
  deleteRobotByIdController,
} from './robots-controllers';

describe('Given a createRobotController function from robotsControllers', () => {
  const request = {} as Request;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const robot = [
    {
      id: 'robotId',
      name: 'Bot',
      imageUrl: 'url',
      velocity: 10,
      resistance: 10,
      creationDate: '2023-02-24',
      faction: 'Autobots',
    },
  ];

  test('When the creation of robot is succefull it, then it should respond a one robot created', async () => {
    RobotModel.create = jest.fn().mockResolvedValue(robot);
    await createRobotController(request, response as Response, jest.fn());
    expect(response.json).toHaveBeenCalled();
  });

  test('When the database response succes, it should respond whit status 201', async () => {
    RobotModel.create = jest.fn().mockResolvedValue(robot);
    await createRobotController(request, response as Response, jest.fn());
    expect(response.status).toHaveBeenCalledWith(201);
  });

  test('When the database throws an error then it should respond with status 500', async () => {
    RobotModel.create = jest
      .fn()
      .mockRejectedValue(new Error('Something was wrong'));
    await createRobotController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(500);
  });
});

describe('Given a deleteRobotByIdController from robotController', () => {
  const request = {
    params: { id: 'mockId' },
  } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const robot = {
    id: 'robotId',
    name: 'Bot',
    imageUrl: 'url',
    velocity: 10,
    resistance: 10,
    creationDate: '2023-02-24',
    faction: 'Autobots',
  };

  test('When the user delete a robot, it should respond a ', async () => {
    RobotModel.findById = jest.fn().mockResolvedValue(robot.id);
    await deleteRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.json).toHaveReturned();
  });

  test('When the user calls and non exist robot id, then it should return a 404 (not found)', async () => {
    RobotModel.findById = jest.fn().mockResolvedValue(null);
    await deleteRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(404);
  });

  test('When the database throws an error then it should respond with status 500', async () => {
    RobotModel.deleteOne = jest.fn().mockRejectedValue(robot);
    await deleteRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(500);
  });
});
