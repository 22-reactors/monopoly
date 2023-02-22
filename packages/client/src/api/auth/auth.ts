import RequestTransport from '../../service/request/request';
import { IBadResponse, ILoginData, ISignUpData, SignUpResponse, UserResponse } from './interfaces';

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
