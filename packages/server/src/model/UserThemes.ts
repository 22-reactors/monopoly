import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
  Unique,
  AutoIncrement,
  Index,
  BelongsTo,
} from 'sequelize-typescript';

import { Themes } from './Themes';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_themes',
})
export class UserThemes extends Model {
  @AutoIncrement
  @Column(DataType.INTEGER)
  theme_id!: number;

  @AllowNull(false)
  @Unique
  @Index
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => Themes, 'theme_id')
  theme!: Themes;
}
