import express, { type Request, type Response, Router } from 'express';

import { auth } from '../middleware/auth';
import { Themes } from '../model/Themes';
import { UserThemes } from '../model/UserThemes';

export const themizationRoute = Router()
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use('/', auth)
  .get('/', async (_req: Request, res: Response): Promise<Response> => {
    /** Данные юзера из auth*/
    const userId = res.locals.user.id;

    const userTheme: UserThemes | null = await UserThemes.findOne({
      where: { user_id: userId },
      include: [{ model: Themes, attributes: ['theme_name'] }],
    });

    if (userTheme && userTheme.theme.theme_name) {
      return res.status(200).json(userTheme.theme.theme_name);
    }

    return res.status(404).json('user theme not found');
  })
  .post('/', async (req: Request, res: Response): Promise<Response> => {
    const { themeName } = req.body;
    /** Данные юзера из auth*/
    const userId = res.locals.user.id;

    const theme: Themes | null = await Themes.findOne({
      where: { theme_name: themeName },
    });

    if (theme) {
      const userTheme: [UserThemes, null | boolean] = await UserThemes.upsert({
        theme_id: theme.id,
        user_id: userId,
      });

      if (userTheme) {
        return res.status(201).json(userTheme);
      }
    }

    return res.status(500).json('invalid data or DB error');
  });
