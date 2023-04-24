import RequestTransport from '../../service/request/request';
import { PROXY_API_HOST } from '../../utils/const';
import { IUserData } from '../auth/interfaces';
import { IBadResponse } from '../interfaces';
import {
  IChangePasswordResponse,
  IPasswordData,
  IProfileData,
  ProfileResponse,
} from './interfaces';

export class UserAPI extends RequestTransport {
  constructor() {
    super(`${PROXY_API_HOST}/user`);
  }

  changeProfile(data: IProfileData) {
    return this.put('/profile', { data }) as Promise<ProfileResponse>;
  }

  changePassword(data: IPasswordData) {
    return this.put('/password', {
      data,
    }) as Promise<IChangePasswordResponse>;
  }

  changeAvatar(data: FormData) {
    return this.put('/profile/avatar', {
      data,
    }) as Promise<ProfileResponse>;
  }

  getUserById(id: string) {
    return this.get(`/${id}`);
  }

  searchUser(login: string) {
    return this.post('/search', {
      data: { login },
    }) as Promise<IUserData[] | IBadResponse>;
  }
}

export default new UserAPI();
