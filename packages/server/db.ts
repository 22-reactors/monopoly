import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { User } from './src/model/forum/user';
import { Topic } from './src/model/forum/topic';
import { Comment } from './src/model/forum/comment';
import { Emoji } from './src/model/forum/emoji';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [User, Topic, Comment, Emoji],
};

const sequelize = new Sequelize(sequelizeOptions);

export const createClientAndConnect = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    console.log('Connected to the Postgres database!');
  } catch (e) {
    console.error(e);
  }
};
