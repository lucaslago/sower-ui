import axios from 'axios';
import { WHO_AM_I_URL } from '../config';
import toBasicAuth from './toBasicAuth';

export default (requestLib = axios) => {
  let basicAuth;

  const login = (email, password) => {
    basicAuth = toBasicAuth(email, password);
    return requestLib.get(WHO_AM_I_URL, {
      headers: {
        Authorization: basicAuth,
      },
    }).then((response) => {
      localStorage.token = basicAuth;
      return response;
    });
  };

  const loggedIn = () => !!localStorage.token;
  const getToken = () => localStorage.token;
  const logout = () => localStorage.removeItem('token');
  return {
    login,
    loggedIn,
    getToken,
    logout,
  };
};
