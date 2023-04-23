import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { User } from './src/model/forum/user';
import { Topic } from './src/model/forum/topic';
import { Comment } from './src/model/forum/comment';
import { Emoji } from './src/model/forum/emoji';
import { Section } from './src/model/forum/section';
import { Themes } from './src/model/Themes';

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
  models: [User, Topic, Comment, Emoji, Section],
};

const sequelize = new Sequelize(sequelizeOptions);

export const createClientAndConnect = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false, alter: true });

    console.log('Connected to the Postgres database!');

    const synced = await sequelize.sync({ alter: true });
    if (synced) {
      console.log('Synchronized the Postgres database');
      // Добавляем темы по умолчанию в БД при старте сервера
      await Themes.upsert({ theme_name: 'DARK' });
      await Themes.upsert({ theme_name: 'LIGHT' });
    }
  } catch (e) {
    console.error(e);
  }
};
