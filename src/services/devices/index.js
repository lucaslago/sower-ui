import axios from 'axios';
import { SOWER_URL } from '../config'

export default (requestLib = axios) => {

  const fetchDevices = basicAuth => {
    const devicesUrl = `${SOWER_URL}/devices`;
    return requestLib.get(devicesUrl, {
      headers: {
        'Authorization': basicAuth
      }
    });
  };

  return { fetchDevices };
}
