import API, { UserAPI } from "../api/user/user.api";
import { IPasswordData, IProfileData } from "../api/user/interfaces";



class UserController {
  private _api: UserAPI;

  constructor() {
    this._api = API;
  }

  async changeProfile(data: IProfileData) {
    try {
      const response = await this._api.changeProfile(data);
      // if (response)
    } catch (error: any) {
      if (error && error.reason) {
        console.log(error.reason);
      }
    }
  }

  async changePassword(data: IPasswordData) {
    try {
      await this._api.changePassword(data);
    } catch (error: any) {
      if (error && error.reason) {
        console.log(error.reason);
      }
    }
  }

  async changeAvatar(data: FormData) {
    try {
      await this._api.changeAvatar(data);
    } catch (error: any) {
      if (error && error.reason) {
        console.log(error.reason);
      }
    }
  }
}

export default new UserController();
