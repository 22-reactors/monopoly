import { IThemeCard } from "../../components/themeCard/themeCard";

export interface IAddTopicData {
  title: string;
  description?: string;
  userLogin: string;
}

export interface ITopic extends IThemeCard{
  id: number;
  userLogin: string;
  user_id: number;
}

export interface IAddCommentData {
  topic_id: number;
  parent_id: number;
  comment: string;
  userLogin: string;
}

export interface IComment {
  id: number;
  topic_id: number;
  parent_id: number;
  comment: string;
  user_id: number;
}

export interface IAddEmojiData {
  comment_id: number;
  emojiCode: string;
  userLogin: string;
}

export interface IEmoji {
  comment_id: number;
  emojiCode: string;
  user_id: number;
}
