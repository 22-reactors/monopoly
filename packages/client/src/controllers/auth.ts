import API, { AuthAPI } from '../api/auth/auth';
import {
  ILoginData,
  ISignUpData,
  ISignUpGoodResponse,
  IUserData,
  SignUpResponse,
  UserResponse,
} from '../api/auth/interfaces';

export const isSignUpGoodResponse = (
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
    try {
      const response = await this._api.login(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async signup(data: ISignUpData) {
    try {
      const response = await this._api.signUp(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getUser() {
    try {
      const response = await this._api.getUser();
      if (isUserGoodResponse(response)) {
        return response;
      } else {
        console.log(response.reason);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getYandexUser() {
    try {
      const response = await this._api.getUser();
      if (isUserGoodResponse(response)) {
        return { ...response, is_yandex_user: true };
      } else {
        console.log(response.reason);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      const response = await this._api.logout();
      if (response === 'OK') {
        console.log('logged out');
      } else {
        console.log(response.reason);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthController();
