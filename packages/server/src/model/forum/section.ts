import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { User } from './user';

interface ISection {
  user_id: number;
  title: string;
  messagesCount: number;
  topicsCount: number;
}

@Table({ tableName: 'sections' })
export class Section extends Model<ISection> {
  @AllowNull(false)
  @Column(DataType.STRING)
  public title: string | undefined;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  public messagesCount: number;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  public topicsCount: number;
}
