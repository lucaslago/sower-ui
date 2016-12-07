import { WHO_AM_I_URL } from '../config';

export default (axios) => {

  const login = (email, password) => {
      const base64 = new Buffer(`${email}:${password}`).toString('base64');
      const auth = `Basic ${base64}`;
      console.log(WHO_AM_I_URL)
      const response = axios.get(WHO_AM_I_URL, {
        headers: {
          'Authorization': auth
        }
      });
      return response;
  };

  return { login };
};
