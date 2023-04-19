import { Router } from 'express';
import {
  addTopic,
  getTopics,
  addComment,
  deleteComment,
  getComments,
  addEmoji,
  getEmojis,
  createSections,
  deleteEmoji,
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
  SECTIONS,
  DELETE_EMOJI,
} from './router';
import { auth } from '../middleware/auth';

export const boardsRouter = (router: Router) => {
  const boardsRouter: Router = Router();

  router.use(FORUM, boardsRouter);

  boardsRouter
    .post(SECTIONS, auth, createSections)
    .post(ADD_TOPIC, auth, addTopic)
    .post(TOPICS, auth, getTopics)
    .post(ADD_COMMENT, auth, addComment)
    .post(COMMETS, auth, getComments)
    .delete(DELETE_COMMENT, auth, deleteComment)
    .post(ADD_EMOJI, auth, addEmoji)
    .post(EMOJIS, auth, getEmojis)
    .delete(DELETE_EMOJI, auth, deleteEmoji);
};

export const router: Router = Router();
boardsRouter(router);
