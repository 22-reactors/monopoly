import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { User } from './user';
import { Topic } from './topic';

export interface IComment {
  topicId: number;
  parentId: number;
  userId: number;
  comment: Comment;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<IComment> {
  @BelongsTo(() => Topic, {
    foreignKey: 'topic_id',
    as: 'topic',
  })
  public topicId: number;

  @BelongsTo(() => Comment, {
    foreignKey: 'parent_id',
    as: 'parent',
  })
  public parentId: number | null;

  @BelongsTo(() => User, {
    foreignKey: 'user_id',
    as: 'user',
  })
  public userId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public comment: string;
}
