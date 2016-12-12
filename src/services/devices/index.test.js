import DevicesService from './index';
import { SOWER_URL } from '../config';

describe('Devices Service', () => {
  const devicesResponse = {
    data: [
      {
        type: 'devices',
        id: 'ffcb5837-d34c-48cc-ac76-58fe52c367d4',
        relationships: {
          equipment: {
            data: {
              type: 'equipment',
              id: 'b5a48553-0d98-4cbd-b362-cc86e52f1b3e',
            },
          },
        },
      },
    ],
  };

  const authToken = 'Basic 1234ABCD';

  const fakeAxios = {
    get: jest.fn().mockReturnValueOnce(Promise.resolve(devicesResponse)),
  };

  const devicesService = DevicesService(fakeAxios);

  context('fetchDevices', () => {
    it('should call external Devices Service with correct headers', () => {
      const expectedHeaders = {
        headers: {
          Authorization: authToken,
        },
      };

      return devicesService.fetch(authToken)
        .then((response) => {
          expect(fakeAxios.get).toBeCalledWith(`${SOWER_URL}/devices`, expectedHeaders);
          expect(response).toEqual(devicesResponse.data);
        });
    });
  });
});
