import {
  AllowNull,
  Column,
  DataType,
  Index,
  Model,
  Table,
  Unique,
  HasMany,
} from 'sequelize-typescript';

import { UserThemes } from './UserThemes';

@Table({
  tableName: 'themes',
})
export class Themes extends Model<Themes> {
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
