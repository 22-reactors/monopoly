import {
  Column,
  DataType,
  Model,
  Table,
  AllowNull,
  Unique,
} from 'sequelize-typescript';

interface ISection {
  title: string;
  topicsCount: number;
  messagesCount: number;
}

@Table({ tableName: 'sections' })
export class Section extends Model<ISection> {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public title: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  public topicsCount: number;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  public messagesCount: number;
}
