import axios from 'axios';
import { WHO_AM_I_URL } from '../config';
import toBasicAuth from './toBasicAuth';

export default (requestLib = axios) => {
  const login = (email, password) => {
    return requestLib.get(WHO_AM_I_URL, {
      headers: {
        'Authorization': toBasicAuth(email, password)
      }
    });
  };

  return { login };
};
