import axios from 'axios';
import { SOWER_URL } from '../config';
// eslint-disable-next-line
const hasDefaultSimulation = device => (device.relationships.equipment.data.default_simulation ? -1 : 1);
const sortDevices = devices => [...devices].sort(hasDefaultSimulation);

export default (requestLib = axios) => {
  const fetch = (basicAuth) => {
    const devicesUrl = `${SOWER_URL}/devices`;
    return requestLib.get(devicesUrl, {
      headers: {
        Authorization: basicAuth,
      },
    }).then((r) => {
      const response = Object.assign({}, r.data);
      const sortedDevices = sortDevices(response.data);
      response.data = sortedDevices;
      return response;
    });
  };

  return { fetch };
};
