import {
  Model,
  Table,
  BelongsTo,
  Column,
  DataType,
  AllowNull,
} from 'sequelize-typescript';
import { User } from './user';
import { Comment } from './comment';

export interface IEmoji {
  userId: number;
  commentId: number;
  emojiCode: string;
}

@Table({ tableName: 'emojis' })
export class Emoji extends Model<IEmoji> {
  @BelongsTo(() => User, {
    foreignKey: 'user_id',
    as: 'user',
  })
  public userId: number;

  @BelongsTo(() => Comment, {
    foreignKey: 'comment_id',
    as: 'comment',
  })
  public commentId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public emojiCode: string;
}
