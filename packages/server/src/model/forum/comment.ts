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
  topic_id: number;
  parent_id: number;
  user_id: number;
  comment: Comment;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<IComment> {
  @BelongsTo(() => Topic, {
    foreignKey: 'topic_id',
    as: 'topic',
  })
  public topic_id: number;

  @BelongsTo(() => Comment, {
    foreignKey: 'parent_id',
    as: 'parent',
  })
  public parent_id: number | null;

  @BelongsTo(() => User, {
    foreignKey: 'user_id',
    as: 'user',
  })
  public user_id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public comment: string;
}
