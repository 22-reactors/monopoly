import API, { ForumAPI } from '../api/forum/forum';
import { IAddTopicData } from '../api/forum/interfaces';

class ForumController {
  private _api: ForumAPI;

  constructor() {
    this._api = API;
  }

  async addTopic(data: IAddTopicData) {
    try {
      const response = await this._api.addTopic(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getTopics() {
    try {
      const response = await this._api.getTopics();
      if (response) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ForumController();
