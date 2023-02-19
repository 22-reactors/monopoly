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

export interface IBadResponse {
  reason: string;
}

export interface ISignUpGoodResponse {
  id: number;
}

export type SignUpResponse = ISignUpGoodResponse | IBadResponse;

export type UserResponse = IUserData | IBadResponse;

export class AuthAPI extends RequestTransport {
  constructor() {
    super('/auth');
  }

  login(data: ILoginData) {
    return this.post('/signin', {
      data,
    }) as Promise<'OK' | IBadResponse>;
  }

  signUp(data: ISignUpData) {
    return this.post('/signup', {
      data,
    }) as Promise<SignUpResponse>;
  }

  getUser() {
    return this.get('/user') as Promise<UserResponse>;
  }

  logout() {
    return this.post('/logout') as Promise<"OK" | IBadResponse>;
  }
}

export default new AuthAPI();
