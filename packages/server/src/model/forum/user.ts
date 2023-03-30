import {
  Model,
  Table,
  Column,
  DataType,
  Unique,
  AllowNull,
} from 'sequelize-typescript';

export interface IUser {
  login: string
}

@Table({ tableName: 'users' })
export class User extends Model<IUser> {
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  public login: string;
}
