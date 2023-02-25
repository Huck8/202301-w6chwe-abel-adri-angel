import { Request, Response } from 'express';
import { RobotModel } from './robot-schema';
import {
  getRobotByIdController,
  getRobotsController,
} from './robots-controllers';

describe('Given a getRobotsControler function from robotsControllers', () => {
  // Información de prueba necesaria
  const request = {} as Request;
  const response = {
    status: jest.fn().mockReturnThis(), // Mock de status para devolverse a si mismo
    json: jest.fn(),
  } as Partial<Response>;

  const robots = [
    {
      id: 'robotID',
      name: 'Pepe',
    },
  ];

  // TEST 1 -> que la función getRobotsController() devuelva robots
  test('When it is invoked it should return a list of robots', async () => {
    // Reasignamos la función original -> MOCK para que cuando se ejecute el test llame a nuestra
    // función controlada en vez de llamar a la original.
    RobotModel.find = jest.fn().mockResolvedValue(robots);

    await getRobotsController(request, response as Response, jest.fn());
    expect(response.json).toHaveBeenCalledWith(robots);
  });

  // TEST 2 -> que la función getRobotsController() devuelva un error 500
  test('When it is invoked and database trows an error', async () => {
    //
    RobotModel.find = jest.fn().mockRejectedValue(new Error('Error!'));

    await getRobotsController(request, response as Response, jest.fn());
    expect(response.status).toHaveBeenCalledWith(500);
  });
});

describe('Given a getRobotByIdController function from robotsControllers', () => {
  const request = {
    params: { id: 'mockId' }, // Mock de la info necesaria en la request -> ID
  } as Partial<Request>;

  const response = {
    status: jest.fn().mockReturnThis(), // Mock de status para devolverse a si mismo
    json: jest.fn(),
  } as Partial<Response>;

  const robot = {
    id: 'robotID',
    name: 'Pepe',
  };

  // TEST 1 -> que la función getRobotIdController() devuelva un robot por ID
  test('When it is invoked it should return a robot searched by id', async () => {
    RobotModel.findById = jest.fn().mockResolvedValue(robot);

    await getRobotByIdController(
      // LLamamos a la función con la Request y la Response de express
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.json).toHaveBeenCalledWith(robot);
  });

  // TEST 2 -> que la función getRobotIdController() devuelva un error 404
  test('When it is invoked and the wanted robot does not exits', async () => {
    RobotModel.findById = jest.fn().mockResolvedValue(null);

    await getRobotByIdController(
      // LLamamos a la función con la Request y la Response de express
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(500);
  });
});
