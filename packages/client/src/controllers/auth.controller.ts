import { redirect, useNavigate } from 'react-router-dom';
import API, {
  AuthAPI,
  ILoginData,
  ISignUpData,
  ISignUpGoodResponse,
  IUserData,
  SignUpResponse,
  UserResponse,
} from '../api/auth.api';

const isSignUpGoodResponse = (
  object: SignUpResponse
): object is ISignUpGoodResponse => 'id' in object;

const isUserGoodResponse = (object: UserResponse): object is IUserData =>
  'avatar' in object;

class AuthController {
  private _api: AuthAPI;

  constructor() {
    this._api = API;
  }

  async login(data: ILoginData) {
    const response = await this._api.login(data);
    if (response == 'OK') {
      return response;
    } else {
      console.log(response.reason);
    }
  }

  async signup(data: ISignUpData) {
    const response = await this._api.signUp(data);

    if (isSignUpGoodResponse(response)) {
      return response;
    } else {
      console.log(response.reason);
    }
  }

  async getUser() {
    const response = await this._api.getUser();
    if (isUserGoodResponse(response)) {
      return response;
    } else {
      console.log(response.reason);
    }
  }

  async logout() {
    const response = await this._api.logout();
    if (response === 'OK') {
      console.log('logged out');
    } else {
      console.log(response.reason);
    }
  }
}

export default new AuthController();
