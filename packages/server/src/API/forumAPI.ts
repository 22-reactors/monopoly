import type { Request, Response } from 'express';
import { Topic } from '../model/forum/topic';
import { Comment } from '../model/forum/comment';
import { Emoji } from '../model/forum/emoji';
import { User } from '../model/forum/user';
import { Section } from '../model/forum/section';

export const createSections = async (req: Request, res: Response) => {
  try {
    const titles = req.body.titles as string[];
    for (const title of titles) {
      await Section.findOrCreate({
        where: { title: title },
        defaults: { title: title, topicsCount: 0, messagesCount: 0 },
      });
    }
    const data = await Section.findAll();
    data.sort((a, b) => a.id - b.id);

    res.send({ sections: data });
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
};

export const addTopic = async (req: Request, res: Response) => {
  try {
    const { title, description, userLogin, sectionId } = req.body;

    const user = await User.findOrCreate({
      where: { login: userLogin },
    });

    await Topic.create({
      userLogin,
      title,
      description: description ?? '',
      user_id: user[0].id,
      section_id: sectionId,
      amountAnswer: 0,
    });

    const section = await Section.findByPk(sectionId);
    section?.update({ topicsCount: section.topicsCount + 1 });

    res.send('OK');
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
};

export const getTopics = async (req: Request, res: Response) => {
  try {
    const { sectionId } = req.body;

    const data = await Topic.findAll({ where: { section_id: sectionId } });
    const section = await Section.findByPk(sectionId);

    res.send({ topics: data, sectionTitle: section?.title });
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { comment, topic_id, parent_id, userLogin } = req.body;

    const user = await User.findOrCreate({
      where: { login: userLogin },
    });

    const newComment = await Comment.create({
      comment: comment,
      topic_id: topic_id,
      parent_id: parent_id,
      user_id: user[0].id,
    });

    const topic = await Topic.findByPk(topic_id);
    topic?.update({
      lastMessageTime: newComment.updatedAt.toJSON(),
      amountAnswer: topic.amountAnswer + 1,
    });

    const section = await Section.findByPk(topic?.section_id);
    section?.update({ messagesCount: section.messagesCount + 1 });

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
      where: { topic_id: id },
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

    const topic = await Topic.findByPk(comment?.topic_id);
    topic?.update({ amountAnswer: topic.amountAnswer - 1 });

    const section = await Section.findByPk(topic?.section_id);
    section?.update({ messagesCount: section.messagesCount + 1 });

    res.send('OK');
  } catch (e) {
    res.status(400).send();
    console.error(e);
  }
};

export const addEmoji = async (req: Request, res: Response) => {
  try {
    const { comment_id, userLogin, emojiCode } = req.body;

    const user = await User.findOrCreate({
      where: { login: userLogin },
    });

    const foundItem = await Emoji.findOne({
      where: {
        comment_id: comment_id,
        user_id: user[0].id,
        emojiCode: emojiCode,
      },
    });
    if (!foundItem) {
      await Emoji.create({
        comment_id: comment_id,
        user_id: user[0].id,
        emojiCode: emojiCode,
      });
    } else {
      await Emoji.update(
        { emojiCode: emojiCode },
        { where: { comment_id: comment_id, user_id: user[0].id } }
      );
    }
    const data = await Emoji.findAll({
      where: { user_id: user[0].id },
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
      where: { user_id: user[0].id },
    });
    res.send({ emojis: data });
  } catch (e) {
    res.status(400).send();
    console.error(e);
  }
};
