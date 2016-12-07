import { WHO_AM_I_URL } from '../config';
import toBasicAuth from './toBasicAuth';

export default (axios) => {
  const login = (email, password) => {
    return axios.get(WHO_AM_I_URL, {
      headers: {
        'Authorization': toBasicAuth(email, password)
      }
    });
  };
  return { login };
};
