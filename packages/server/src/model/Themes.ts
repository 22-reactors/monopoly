import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
  Unique,
  Index,
} from 'sequelize-typescript';

import { UserThemes } from './UserThemes';


@Table({
  tableName: 'themes',
})
export class Themes extends Model {
  @AllowNull(false)
  @Unique
  @Index
  @Column(DataType.STRING)
  public theme_name!: string;

  @AllowNull
  @Column(DataType.STRING)
  public user_themes: UserThemes;
}
