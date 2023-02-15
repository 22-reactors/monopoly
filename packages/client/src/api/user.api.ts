import RequestTransport from '../service/request/request';

export interface IProfileData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface IPasswordData {
  oldPassword: string;
  newPassword: string;
}

export class UserAPI extends RequestTransport {
  constructor() {
    super('/user');
  }

  changeProfile(data: IProfileData) {
    return this.put('/profile', { data });
  }

  changePassword(data: IPasswordData) {
    return this.put('/password', {
      data,
    });
  }

  changeAvatar(data: FormData) {
    return this.put('/profile/avatar', {
      data,
    });
  }

  getUserById(id: string) {
    return this.get(`/${id}`);
  }

  searchUser(login: string) {
    return this.post('/search', {
      data: { login },
    });
  }
}

export default new UserAPI();
