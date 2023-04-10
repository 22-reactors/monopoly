import { IUser } from '../../utils/interfaces';

export interface ISection {
  id: number;
  title: string;
  topicsCount: number;
  messagesCount: number;
}

export interface IAddTopicData {
  title: string;
  description?: string;
  userData: IUser;
  sectionId: number;
}

export interface ITopic {
  id: number;
  user_id: number;
  section_id: number;
  title: string;
  description?: string;
  userData: IUser;
  lastMessageTime?: string;
  amountAnswer: number;
}

export interface ITopics {
  topics: ITopic[];
  sectionTitle?: string;
}

export interface IAddCommentData {
  topic_id: number;
  parent_id?: number;
  comment: string;
  userData: IUser;
}

export interface IComment extends IAddCommentData {
  id: number;
  user_id: number;
  updatedAt: string;
}

export interface IComments {
  comments: IComment[];
  topicTitle?: string;
}

export interface IAddEmojiData {
  comment_id: number;
  emojiCode: string;
  userLogin: string;
}

export interface IEmojis {
  emojis: Record<string, { count: number; isUserReacted: boolean }>;
}
