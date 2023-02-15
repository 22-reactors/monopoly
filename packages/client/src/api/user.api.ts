import RequestTransport from '../service/request/request';

export interface IProfile {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

class UserAPI extends RequestTransport {
  constructor() {
    super("/user")
  }

  changeProfile() {
    this.get("/profile");
  }
}

export default new UserAPI();
