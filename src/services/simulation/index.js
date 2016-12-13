import axios from 'axios';
import { SOWER_URL } from '../config';

export default (requestLib = axios) => {
  const start = ({ trackerId, authToken }) => requestLib.post(`${SOWER_URL}/simulation/${trackerId}/_start`, {
    Authorization: authToken,
  });

  return { start };
};
