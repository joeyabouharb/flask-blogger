import { loginRequest, registerRequest } from '../../services/data_services';

class Auth {
  constructor() {
    this.authenticated = false;
    this.token = {};
    this.status = 200;
  }

  login(data) {
    loginRequest(data).then((response) => {
      if (response.status === 200) {
        this.status = 200;
        this.authenticated = true;
        this.token = response.json().access_token;
      } else {
        this.status = 400;
      }
    });
  }

  register(data) {
    registerRequest(data).then((response) => {
      if (response.status === 200) {
        this.status = 200;
      } else {
        this.status = 400;
      }
    });
  }

  isAuthenticated() {
    return this.authenticated;
  }

  getUserToken() {
    return this.token;
  }

  logout() {
    this.token = {};
    this.authenticated = false;
  }
}

export default new Auth();
