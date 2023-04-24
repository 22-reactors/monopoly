import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  Unique,
  Index,
} from 'sequelize-typescript';

import { Themes } from './Themes';


@Table({
  tableName: 'user_themes',
})
export class UserThemes extends Model {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  theme_id: number;

  @AllowNull
  @Unique
  @Index
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => Themes, 'theme_id')
  theme!: Themes;
}
