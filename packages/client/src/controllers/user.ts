import API, { UserAPI } from '../api/user/user';
import {
  IPasswordData,
  IProfileData,
  ProfileResponse,
} from '../api/user/interfaces';
import { IUser } from '../utils/interfaces';

const isChangeProfileGoodResponse = (
  object: ProfileResponse
): object is IUser => 'id' in object;

class UserController {
  private _api: UserAPI;

  constructor() {
    this._api = API;
  }

  async changeProfile(data: IProfileData) {
    try {
      const response = await this._api.changeProfile(data);
      if (isChangeProfileGoodResponse(response)) {
        return response;
      } else {
        console.log(response.reason);
      }
    } catch (error: any) {
      if (error && error.reason) {
        console.log(error.reason);
      }
    }
  }

  async changePassword(data: IPasswordData) {
    const values = Object.values(data);
    const isEmptyValue = values.some(value => value === '');

    if (isEmptyValue) {
      return;
    }

    try {
      const response = await this._api.changePassword(data);
      if (response !== 'OK') {
        return response.reason;
      }
    } catch (error: any) {
      if (error && error.reason) {
        console.log(error.reason);
      }
    }
  }

  async changeAvatar(data: FormData) {
    try {
      const response = await this._api.changeAvatar(data);
      if (isChangeProfileGoodResponse(response)) {
        return response;
      } else {
        console.log(response.reason);
      }
    } catch (error: any) {
      if (error && error.reason) {
        console.log(error.reason);
      }
    }
  }
}

export default new UserController();
