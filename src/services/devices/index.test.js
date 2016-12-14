import DevicesService from './index';
import { SOWER_URL } from '../config';

describe('Devices Service', () => {
  const authToken = 'Basic 1234ABCD';
  let devicesService;
  let devicesResponse;
  let fakeAxios;

  beforeEach(() => {
    devicesResponse = {
      data: {
        data: [
          {
            type: 'devices',
            id: 'ffcb5837-d34c-48cc-ac76-58fe52c367d4',
            relationships: {
              equipment: {
                data: {
                  type: 'equipment',
                  id: 'b5a48553-0d98-4cbd-b362-cc86e52f1b3e',
                  description: 'Challenger LB AB-7430 - Tractor',
                  default_simulation: false,
                },
              },
            },
          },
          {
            type: 'devices',
            id: 'ffcb5837-d34c-48cc-ac76-58fe52c367d1',
            relationships: {
              equipment: {
                data: {
                  type: 'equipment',
                  id: 'b5a48553-0d98-4cbd-b362-cc86e52f1321',
                  description: 'Challenger LB AB-7430 - Harvester',
                  default_simulation: true,
                  simulation_type: 'harverster',
                },
              },
            },
          },
        ],
      },
    };
    fakeAxios = {
      get: jest.fn().mockReturnValue(Promise.resolve(devicesResponse)),
    };
    devicesService = DevicesService(fakeAxios);
  });

  context('fetchDevices', () => {
    it('should call external Devices Service with correct headers', () => {
      const expectedHeaders = {
        headers: {
          Authorization: authToken,
        },
      };
      return devicesService.fetch(authToken)
        .then((response) => {
          const devices = response.data;
          expect(fakeAxios.get).toBeCalledWith(`${SOWER_URL}/devices`, expectedHeaders);
          expect(devices.length).toEqual(2);
        });
    });

    it('should return the devices that have default simulation first', () => {
      const expectedFirstDevice = devicesResponse.data.data[1];
      return devicesService.fetch(authToken)
        .then((response) => {
          const devices = response.data;
          expect(devices[0]).toEqual(expectedFirstDevice);
        });
    });
  });
});
