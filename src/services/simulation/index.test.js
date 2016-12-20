import SimulationService from './index';
import { SOWER_URL } from '../config';

describe('Simulation Service', () => {
  const successResponse = { status: 204 };
  const fakeAxios = {
    post: jest.fn().mockReturnValue(Promise.resolve(successResponse)),
  };

  const simulationService = SimulationService(fakeAxios);
  const authToken = 'Basic ABCD123e';
  const expectedHeaders = {
    headers: {
      Authorization: authToken,
    },
  };

  context('start', () => {
    it('should successfully post to sower start simulation endpoint', () => {
      const trackerId = '123';
      return simulationService.start({ trackerId, authToken }).then((response) => {
        expect(fakeAxios.post).toHaveBeenCalledWith(`${SOWER_URL}/simulation/${trackerId}/_start`, {}, expectedHeaders);
        expect(response).toBe(successResponse);
      });
    });
  });

  context('stop', () => {
    it('should post to sower stop simulation endpoint', () => {
      const trackerId = '123';
      return simulationService.stop({ trackerId, authToken }).then((response) => {
        expect(fakeAxios.post).toHaveBeenCalledWith(`${SOWER_URL}/simulation/${trackerId}/_stop`, {}, expectedHeaders);
        expect(response).toBe(successResponse);
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

    it('should post a new simulation to sower', () => {
      const trackerId = '123';
      return simulationService.create({ trackerId, authToken, payload }).then((response) => {
        expect(fakeAxios.post).toHaveBeenCalledWith(`${SOWER_URL}/simulation/${trackerId}`, payload, expectedHeaders);
        expect(response).toBe(successResponse);
      });
    });
  });
});
