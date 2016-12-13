import SimulationService from './index';
import { SOWER_URL } from '../config';

describe('Simulation Service', () => {
  const successResponse = { status: 204};
  const fakeAxios = {
    post: jest.fn().mockReturnValueOnce(Promise.resolve(successResponse)),
  };

  const simulationService = SimulationService(fakeAxios);
  const authToken = 'Basic ABCD123e';
  const expectedHeaders = {
    Authorization: authToken
  };

  context('start', () => {
    it('should successfully post to sower start simulation endpoint', () => {
      const trackerId = '123';
      return simulationService.start({ trackerId, authToken }).then(response => {
        expect(fakeAxios.post).toHaveBeenCalledWith(`${SOWER_URL}/simulation/${trackerId}/_start`, expectedHeaders);
        expect(response).toBe(successResponse);
      });
    }); 
  });
});
