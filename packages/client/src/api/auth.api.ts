import RequestTransport from '../service/request/request';

export interface IUserData {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface ISignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ILoginData {
  login: string;
  password: string;
}

export class AuthAPI extends RequestTransport {
  constructor() {
    super('/auth');
  }

  login(data: ILoginData) {
    return this.post('/signin', {
      data,
    });
  }

  signUp(data: ISignUpData) {
    return this.post('/signup', {
      data,
    }) as Promise<{ id: number }>;
  }

  getUser() {
    return this.get('/user') as Promise<IUserData>;
  }

  logout() {
    return this.post('/logout');
  }
}

export default new AuthAPI();
