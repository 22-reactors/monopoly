import type { Request, Response } from 'express';
import { Topic } from '../model/forum/topic';
import { Comment } from '../model/forum/comment';
import { Emoji } from '../model/forum/emoji';
import { User } from '../model/forum/user';

export const addTopic = async (req: Request, res: Response) => {
  try {
    const { title, description, userLogin } = req.body;

    const user = await User.findOrCreate({
      where: { login: userLogin },
    });

    await Topic.create({
      title: title,
      description: description ?? '',
      userId: user[0].id,
    });

    res.send('OK');
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
};

export const getTopics = async (_: Request, res: Response) => {
  try {
    const data = await Topic.findAll();
    res.send({ topics: data });
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { comment, topicId, parentId, userLogin } = req.body;

    const user = await User.findOrCreate({
      where: { login: userLogin },
    });

    await Comment.create({
      comment: comment,
      topicId: topicId,
      parentId: parentId,
      userId: user[0].id,
    });

    res.send('OK');
  } catch (e) {
    res.status(400).send();
    console.error(e);
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const data = await Comment.findAll({
      where: { topicId: id },
    });
    res.send({ comments: data });
  } catch (e) {
    res.status(400).send();
    console.error(e);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const comment = await Comment.findByPk(id);
    await comment?.destroy();

    res.send('OK');
  } catch (e) {
    res.status(400).send();
    console.error(e);
  }
};

export const addEmoji = async (req: Request, res: Response) => {
  try {
    const { commentId, userLogin, emojiCode } = req.body;

    const user = await User.findOrCreate({
      where: { login: userLogin },
    });

    const foundItem = await Emoji.findOne({
      where: { commentId: commentId, userId: user[0].id, emojiCode: emojiCode },
    });
    if (!foundItem) {
      await Emoji.create({
        commentId: commentId,
        userId: user[0].id,
        emojiCode: emojiCode,
      });
    } else {
      await Emoji.update(
        { emojiCode: emojiCode },
        { where: { commentId: commentId, userId: user[0].id } }
      );
    }
    const data = await Emoji.findAll({
      where: { userId: user[0].id },
    });
    res.send({ emojis: data });
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
};

export const getEmojis = async (req: Request, res: Response) => {
  try {
    const { userLogin } = req.body;

    const user = await User.findOrCreate({
      where: { login: userLogin },
    });

    const data = await Emoji.findAll({
      where: { userId: user[0].id },
    });
    res.send({ emojis: data });
  } catch (e) {
    res.status(400).send();
    console.error(e);
  }
};
