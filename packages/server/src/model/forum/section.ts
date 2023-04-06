import {
  Column,
  DataType,
  Model,
  Table,
  AllowNull,
  Unique,
} from 'sequelize-typescript';

interface ISection {
  sectionId: number;
}

@Table({ tableName: 'sections' })
export class Section extends Model<ISection> {
  @Unique
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public sectionId: number;
}
