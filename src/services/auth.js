import axios from 'axios';
const WHO_AM_I = 'https://agco-iam-test.herokuapp.com/whoAmI';

export default {

  login: (email, password) => {
    const base64 = new Buffer(`${email}:${password}`).toString('base64');
    const auth = `Basic ${base64}`;
    return axios.get(WHO_AM_I, {
      headers: {
        'Authorization':auth
      }
    });
  }

};
