/*
* Auth Singleton class
*/
import {
  registerRequest,
} from '../../services/data_services';

class Auth {
  constructor() {
    this.authenticated = false;
    this.token = {};
    this.status = 200;
  }

  login(data) {
    // user login method. saves JWT token if successful
    if (data.access_token) {
      this.token = data.access_token;
      this.isAuthenticated = true;
    } else {
      throw new Error('Incorrect credentials supplied');
    }
  }

  register(data) {
    // call API to register new user
    registerRequest(data).then((response) => {
      if (response.status === 200) {
        this.status = 200;
      } else {
        this.status = 400;
      }
    });
  }

  isAuthenticated() {
    // checks if user is authenticated
    return this.authenticated;
  }

  getUserToken() {
    // returns JWT token
    return this.token;
  }

  logout() {
    // logout user
    this.token = {};
    this.authenticated = false;
  }
}

export default new Auth();
