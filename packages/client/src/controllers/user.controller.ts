import API, { IPasswordData, IProfileData, UserAPI } from "../api/user.api";

class UserController {
  private _api: UserAPI;

  constructor() {
    this._api = API;
  }

  async changeProfile(data: IProfileData) {
    try {
      await this._api.changeProfile(data);
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
