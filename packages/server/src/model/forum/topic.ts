import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { User } from './user';

interface ITopic {
  user_id: number;
  title: string;
  description?: string;
  userLogin: string;
  lastMessageTime?: string;
  amountAnswer: number
}

@Table({ tableName: 'topics' })
export class Topic extends Model<ITopic> {
  @BelongsTo(() => User, {
    foreignKey: 'user_id',
    as: 'user',
  })
  user_id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public userLogin: string | undefined;

  @AllowNull(false)
  @Column(DataType.STRING)
  public title: string | undefined;

  @AllowNull(true)
  @Column(DataType.STRING)
  public description: string | undefined;

  @AllowNull(true)
  @Column(DataType.STRING)
  public lastMessageTime: string | undefined;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  public amountAnswer: number;
}
