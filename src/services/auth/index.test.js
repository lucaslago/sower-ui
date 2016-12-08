import AuthService from './index';
import toBasicAuth from './toBasicAuth';
import { WHO_AM_I_URL } from '../config';

describe('Auth Service', () => {
  const whoAmIResponse = {
    serviceUsers: [
      {
        id: 1,
        emailAddress: 'mock@mock.com'
      }
    ]
  };
  const fakeAxios = {
    get: jest.fn().mockReturnValueOnce(Promise.resolve(whoAmIResponse))
  };
  const authService = AuthService(fakeAxios);

  context('login', () => {
    it('should call external IAM Service with correct headers', () => {
      const email = 'blabla@blabla.com';
      const password = '123';
      const basicAuth = toBasicAuth(email, password);
      const expectedHeaders = {
        headers: {
          Authorization: basicAuth
        }
      };
      return authService.login(email, password)
        .then((response) => {
          expect(localStorage.token).toEqual(basicAuth);
          expect(fakeAxios.get).toBeCalledWith(WHO_AM_I_URL, expectedHeaders);
          expect(response).toEqual(whoAmIResponse);
        });
    });
  });
});
