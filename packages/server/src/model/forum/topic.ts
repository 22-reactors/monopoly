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
  userId: number;
  title: string;
  description?: string;
}

@Table({ tableName: 'topics' })
export class Topic extends Model<ITopic> {
  @BelongsTo(() => User, {
    foreignKey: 'user_id',
    as: 'user',
  })
  userId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public title: string | undefined;

  @AllowNull(true)
  @Column(DataType.STRING)
  public description: string | undefined;
}
