import RequestTransport from '../../service/request/request';
import { PROXY_API_HOST } from '../../utils/const';
import { IBadResponse } from '../interfaces';
import {
  ILoginData,
  ISignUpData,
  SignUpResponse,
  UserResponse,
} from './interfaces';

export class AuthAPI extends RequestTransport {
  constructor() {
    super(`${PROXY_API_HOST}/auth`);
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

  getUser(headers?: Record<string, string>) {
    return this.get('/user', { headers }) as Promise<UserResponse>;
  }

  logout() {
    return this.post('/logout') as Promise<'OK' | IBadResponse>;
  }
}

export default new AuthAPI();
