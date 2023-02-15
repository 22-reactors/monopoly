import RequestTransport from '../service/request/request';

export default abstract class BaseAPI {
  protected request: RequestTransport;

  protected constructor(endpoint: string) {
    this.request = new RequestTransport(endpoint);
  }
}
