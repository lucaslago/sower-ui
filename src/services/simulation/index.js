import axios from 'axios';
import { SOWER_URL } from '../config';

export default (requestLib = axios) => {
  const start = ({ trackerId, authToken }) => requestLib.post(`${SOWER_URL}/simulation/${trackerId}/_start`, {}, {
    headers: {
      Authorization: authToken,
    },
  });

  const stop = ({ trackerId, authToken }) => requestLib.post(`${SOWER_URL}/simulation/${trackerId}/_stop`, {}, {
    headers: {
      Authorization: authToken,
    },
  });

  const create = ({ trackerId, authToken, payload }) => requestLib.post(`${SOWER_URL}/simulation/${trackerId}`, payload, {
    headers: {
      Authorization: authToken,
    },
  });

  return { start, stop, create };
};
