import AuthService from './index';
import toBasicAuth from './toBasicAuth';
import { WHO_AM_I_URL } from '../config';

describe('Auth Service', () => {
  const whoAmIResponse = {
    serviceUsers: [
      {
        id: 1,
        emailAddress: 'mock@mock.com',
      },
    ],
  };
  const fakeAxios = {
    get: jest.fn().mockReturnValueOnce(Promise.resolve(whoAmIResponse)),
  };
  const authService = AuthService(fakeAxios);

  beforeEach(() => {
    delete localStorage.token;
  });

  context('login', () => {
    it('should call external IAM Service with correct headers', () => {
      const email = 'blabla@blabla.com';
      const password = '123';
      const basicAuth = toBasicAuth(email, password);
      const expectedHeaders = {
        headers: {
          Authorization: basicAuth,
        },
      };
      return authService.login(email, password)
        .then((response) => {
          expect(localStorage.token).toEqual(basicAuth);
          expect(fakeAxios.get).toBeCalledWith(WHO_AM_I_URL, expectedHeaders);
          expect(response).toEqual(whoAmIResponse);
        });
    });
  });

  context('loggedIn', () => {
    it('should return true if token is stored in localStorage', () => {
      const token = '123';
      expect(authService.loggedIn()).toEqual(false);
      localStorage.token = token;
      expect(authService.loggedIn()).toEqual(true);
    });
  });

  context('getToken', () => {
    it('should return localStorage token value', () => {
      const expectedToken = '123';
      localStorage.token = expectedToken;
      expect(authService.getToken()).toEqual(expectedToken);
    });
  });
});
