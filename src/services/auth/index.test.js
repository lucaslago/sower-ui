import nock from 'nock';
import axios from 'axios';
import { IAM_URL } from '../config';
import Auth from './index';

describe('Auth Service', () => {
  context('login', () => {
    it('should call IAM service with user e-mail and password', (done) => {
      const whoAmIResponse = {
        serviceUsers: [
        {
          id: 1,
          emailAddress: 'mock@mock.com'
        }
        ]
      };
      const password = '123';
      const email = 'blabla@blabla.com';
      const auth = Auth(axios);
      console.log(IAM_URL)
      nock(IAM_URL)
        .get('/whoAmI')
        .reply(200, whoAmIResponse);

        auth.login(email, password)
          .then((response) => {
            console.log(response);
            done();
          });
      });
    });
  });
