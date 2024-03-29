import RequestTransport from '../../service/request/request';
import { SERVER_API_HOST } from '../../utils/const';
import {
  IAddCommentData,
  IAddEmojiData,
  IAddTopicData,
  IComments,
  IEmojis,
  ISection,
  ITopics,
} from './interfaces';

export class ForumAPI extends RequestTransport {
  constructor() {
    super(`${SERVER_API_HOST}/forum`);
  }

  createSections(titles: string[]) {
    return this.post('/sections', { data: { titles } }) as Promise<
      { sections: ISection[] } | ''
    >;
  }

  addTopic(data: IAddTopicData) {
    return this.post('/add-topic', { data }) as Promise<'OK' | ''>;
  }

  getTopics(sectionId: number) {
    return this.post('/topics', {
      data: { sectionId: sectionId },
    }) as Promise<ITopics | ''>;
  }

  addComment(data: IAddCommentData) {
    return this.post('/add-comment', { data }) as Promise<'OK' | ''>;
  }

  getComments(id: number) {
    return this.post('/comments', { data: { id } }) as Promise<IComments | ''>;
  }

  deleteComment(id: number) {
    return this.delete('/delete-comment', { data: { id } }) as Promise<
      'OK' | ''
    >;
  }

  addEmoji(data: IAddEmojiData) {
    return this.post('/add-emogi', { data }) as Promise<IEmojis | ''>;
  }

  deleteEmoji(data: IAddEmojiData) {
    return this.delete('/delete-emogi', { data }) as Promise<IEmojis | ''>;
  }

  getEmojis(comment_id: number, userLogin: string) {
    return this.post('/emogis', { data: { comment_id, userLogin } }) as Promise<
      IEmojis | ''
    >;
  }
}

export default new ForumAPI();
