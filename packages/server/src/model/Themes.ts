import {
  AllowNull,
  Column,
  DataType,
  Index,
  Model,
  Table,
  Unique,
  AutoIncrement,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';

import { UserThemes } from './UserThemes';

@Table({
  tableName: 'themes'
})

export class Themes extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Unique
  @Index
  @Column(DataType.STRING)
  theme_name!: string;

  @HasMany(() => UserThemes, 'id')
  user_themes!: UserThemes;

  @AllowNull(false)
  @Column(DataType.STRING)
  description: string;
} 