export interface IAddTopicData {
  title: string;
  description?: string;
  userLogin: string;
}

export interface ITopic {
  title: string;
  description?: string;
  userId: number;
}

export interface IAddCommentData {
  topicId: number;
  parentId: number;
  comment: string;
  userLogin: string;
}

export interface IComment {
  topicId: number;
  parentId: number;
  comment: string;
  userId: number;
}

export interface IAddEmojiData {
  commentId: number;
  emojiCode: string;
  userLogin: string;
}

export interface IEmoji {
  commentId: number;
  emojiCode: string;
  userId: number;
}
