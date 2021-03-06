import SimulationService from './index';
import { SOWER_URL } from '../config';

describe('Simulation Service', () => {
  const successGenericResponse = { status: 204 };

  const authToken = 'Basic ABCD123e';
  const trackerId = '123';
  const expectedHeaders = {
    headers: {
      Authorization: authToken,
    },
  };

  context('start', () => {
    const axiosStub = { post: jest.fn().mockReturnValue(Promise.resolve(successGenericResponse)) };
    const simulationService = SimulationService(axiosStub);
    const expectedConfig = {
      headers: expectedHeaders.headers,
      params: {
        useDefault: false,
      },
    };

    it('should successfully post to sower start simulation endpoint', () => simulationService.start({ trackerId, authToken, useDefault: false })
      .then((response) => {
        expect(axiosStub.post).toHaveBeenCalledWith(`${SOWER_URL}/simulation/${trackerId}/_start`, {}, expectedConfig);
        expect(response).toBe(successGenericResponse);
      }));
  });

  context('stop', () => {
    const axiosStub = { post: jest.fn().mockReturnValue(Promise.resolve(successGenericResponse)) };
    const simulationService = SimulationService(axiosStub);

    it('should post to sower stop simulation endpoint', () => {
      simulationService.stop({ trackerId, authToken })
        .then((response) => {
          expect(axiosStub.post).toHaveBeenCalledWith(`${SOWER_URL}/simulation/${trackerId}/_stop`, {}, expectedHeaders);
          expect(response).toBe(successGenericResponse);
        });
    });
  });

  context('status', () => {
    it('should return a running simulation status', () => {
      const runningResponse = {
        data: {
          data: {
            status: 'active',
            totalPositions: 100,
            remainingPositions: 20,

          },
        },
      };
      const axiosStub = { get: jest.fn().mockReturnValue(Promise.resolve(runningResponse)) };
      const simulationService = SimulationService(axiosStub);

      return simulationService.status({ trackerId, authToken })
        .then((simulationStatus) => {
          expect(axiosStub.get).toHaveBeenCalledWith(`${SOWER_URL}/simulation/${trackerId}/_status`, expectedHeaders);
          expect(simulationStatus).toBe(runningResponse.data.data);
        });
    });

    it('should return a not running simulation status', () => {
      const notRunningResponse = {
        data: {
          data: {
            status: 'inactive',
          },
        },
      };
      const axiosStub = { get: jest.fn().mockReturnValue(Promise.resolve(notRunningResponse)) };
      const simulationService = SimulationService(axiosStub);

      return simulationService.status({ trackerId, authToken })
        .then((simulationStatus) => {
          expect(axiosStub.get).toHaveBeenCalledWith(`${SOWER_URL}/simulation/${trackerId}/_status`, expectedHeaders);
          expect(simulationStatus).toBe(notRunningResponse.data.data);
        });
    });
  });

  context('create', () => {
    const payload = {
      interval: 10000,
      description: 'amazing tractor',
      data: [
        {
          latitude: 36.234742,
          longitude: -41.176623,
          speed: 8.769,
          heading: 185,
          altitude: 400,
          machineStatus: 1,
          canVariables: {
            TRANS_GEAR: 126,
            TRANS_OIL_TEMP: 25,
            VEHICLE_SPEED: 0,
            FUEL_LEVEL: 93.6,
            ENGINE_COOLANT_TEMP: 25,
            ENGINE_ON: 1,
            ENGINE_HOURS: 793260,
            FUEL_TOTAL: 5.042,
            FUEL_RATE: 0.00000202778,
            GSM_SIGNAL: 99,
            SCR_TANK_LEVEL: 74.4,
            WORK_ON: 0,
            ENGINE_LOAD: 54,
            ENGINE_SPEED: 999,
            ENGINE_OIL_PRESS: 724000,
            TRANS_OIL_FILTER_ALARM: 0,
          },
        },
        {
          latitude: 36.234742,
          longitude: -41.1765696,
          speed: 8.769,
          heading: 185,
          altitude: 400,
          machineStatus: 1,
          canVariables: {
            ENGINE_COOLANT_TEMP: 26,
            FUEL_RATE: 0.00000197222,
            GSM_SIGNAL: 3,
            SCR_TANK_LEVEL: 74.8,
            ENGINE_LOAD: 53,
            ENGINE_SPEED: 999.5,
          },
        },
      ],
    };

    const axiosStub = { post: jest.fn().mockReturnValue(Promise.resolve(successGenericResponse)) };
    const simulationService = SimulationService(axiosStub);

    it('should post a new simulation to sower', () => {
      simulationService.create({ trackerId, authToken, payload })
        .then((response) => {
          expect(axiosStub.post).toHaveBeenCalledWith(`${SOWER_URL}/simulation/${trackerId}`, payload, expectedHeaders);
          expect(response).toBe(successGenericResponse);
        });
    });
  });
});
