import { Router } from 'express';
import {
  addTopic,
  getTopics,
  addComment,
  deleteComment,
  getComments,
  addEmoji,
  getEmojis,
} from '../API/forumAPI';
import {
  TOPICS,
  ADD_TOPIC,
  COMMETS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EMOJIS,
  ADD_EMOJI,
  FORUM,
} from './router';

export const boardsRouter = (router: Router) => {
  const boardsRouter: Router = Router();

  router.use(FORUM, boardsRouter);

  boardsRouter
    .post(ADD_TOPIC, addTopic)
    .get(TOPICS, getTopics)
    .post(ADD_COMMENT, addComment)
    .post(COMMETS, getComments)
    .delete(DELETE_COMMENT, deleteComment)
    .post(ADD_EMOJI, addEmoji)
    .post(EMOJIS, getEmojis);
};

export const router: Router = Router();
boardsRouter(router);
