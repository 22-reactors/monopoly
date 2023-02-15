import { redirect } from 'react-router-dom';
import API, { AuthAPI, ILoginData, ISignUpData } from '../api/auth.api';
import { links } from '../utils/const';

class AuthController {
  private _api: AuthAPI;

  constructor() {
    this._api = API;
  }

  async login(data: ILoginData) {
    const response = await this._api.login(data);
    console.log(response);
    redirect(links.game.path);
  }

  async signup(data: ISignUpData) {
    try {
      await this._api.signUp(data);
      const user = await this.getUser();
      console.log(user);
      redirect(links.game.path);
    } catch (error: any) {
      if (error && error.reason) {
        console.log(error.reason);
      }
    }
  }

  async getUser() {
    const user = await this._api.getUser();
    return user;
  }

  async logout() {
    await this._api.logout();
    const user = await this.getUser();
  }
}

export default new AuthController();
