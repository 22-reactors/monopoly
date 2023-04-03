export interface IAddTopicData {
  title: string;
  description?: string;
  userLogin: string;
}

export interface ITopic {
  title: string;
  description?: string;
  user_id: number;
}

export interface IAddCommentData {
  topic_id: number;
  parent_id: number;
  comment: string;
  userLogin: string;
}

export interface IComment {
  topic_id: number;
  parent_id: number;
  comment: string;
  userId: number;
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
