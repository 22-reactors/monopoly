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
  user_id: number;
  comment_id: number;
  emojiCode: string;
}

@Table({ tableName: 'emojis' })
export class Emoji extends Model<IEmoji> {
  @BelongsTo(() => User, {
    foreignKey: 'user_id',
    as: 'user',
  })
  public user_id: number;

  @BelongsTo(() => Comment, {
    foreignKey: 'comment_id',
    as: 'comment',
  })
  public comment_id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public emojiCode: string;
}
