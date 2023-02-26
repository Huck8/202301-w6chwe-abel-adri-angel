import { Request, Response } from 'express';
import { RobotModel } from './robot-schema';
import { updateRobotByIdController } from './robots-controllers';

describe('Given a getRobotsControllers function from robots-controller', () => {
  const request = { params: { id: 'mockId' } } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const robot = {
    id: 'robotId',
    name: 'kjhlk',
    imageUrl: 'urlRobot',
    velocity: 0,
    resistance: 0,
    creationDate: '2023-7-9',
    faction: 'Desepticon',
  };

  test('when the database response is successfull, then it should resolve a update robot', async () => {
    RobotModel.updateOne = jest.fn().mockResolvedValue(robot.id);
    await updateRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.sendStatus).toHaveBeenCalledWith(204);
  });
  test('when the database throws an error then it should respond with status 500', async () => {
    RobotModel.find = jest
      .fn()
      .mockRejectedValue(new Error('something was wrong'));
    await updateRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(500);
  });
});
