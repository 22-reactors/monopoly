import API, { ForumAPI } from '../api/forum/forum';
import UserController from '../controllers/user';
import {
  IAddCommentData,
  IAddEmojiData,
  IAddTopicData,
} from '../api/forum/interfaces';
import { resourceURL } from '../utils/const';

class ForumController {
  private _api: ForumAPI;

  constructor() {
    this._api = API;
  }

  async createSections(titles: string[]) {
    try {
      const response = await this._api.createSections(titles);
      if (response) {
        return response.sections;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addTopic(data: IAddTopicData) {
    try {
      const response = await this._api.addTopic(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getTopics(sectionId: number) {
    try {
      const response = await this._api.getTopics(sectionId);
      if (response) {
        const { topics } = response;
        topics.forEach(async topic => {
          const response = await UserController.searchUser(topic.userLogin);
          topic.avatar = {
            src: response && `${resourceURL}/${response?.avatar}`,
            name: response?.display_name ?? 'Инкогнито',
          };
        });
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addComment(data: IAddCommentData) {
    try {
      const response = await this._api.addComment(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getComments(topic_id: number) {
    try {
      const response = await this._api.getComments(topic_id);
      if (response) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteComment(comment_id: number) {
    try {
      const response = await this._api.deleteComment(comment_id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async addEmoji(data: IAddEmojiData) {
    try {
      const response = await this._api.addEmoji(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmojis(userLogin: string) {
    try {
      const response = await this._api.getEmojis(userLogin);
      if (response) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ForumController();
