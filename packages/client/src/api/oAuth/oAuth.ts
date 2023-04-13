import RequestTransport from '../../service/request/request';
import { IBadResponse, UserResponse } from './interfaces';
import { isServer } from '../../utils/helpers';

export class OAuthAPI extends RequestTransport {
  private readonly redirect_uri: string = '';
  constructor() {
    super('/oauth/yandex');

    if (!isServer) {
      const { protocol, port } = window.location;
      this.redirect_uri = `${protocol}//localhost:${port}`;
    }
  }

  signin(code: string) {
    return this.post('', {
      data: { code, redirect_uri: this.redirect_uri },
    }) as Promise<'OK' | IBadResponse>;
  }

  getServiceId() {
    return this.get('/service-id', {
      data: { redirect_uri: this.redirect_uri },
    }) as Promise<UserResponse>;
  }
}

export default new OAuthAPI();
