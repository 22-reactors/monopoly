import API, { OAuthAPI } from '../api/oAuth/oAuth';

class OAuthController {
  private _api: OAuthAPI;

  constructor() {
    this._api = API;
  }

  async signin(code: string) {
    try {
      const response = await this._api.signin(code);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getServiceId() {
    try {
      const response = await this._api.getServiceId();
      if ('service_id' in response) {
        return response;
      } else {
        console.log(response.reason);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new OAuthController();
