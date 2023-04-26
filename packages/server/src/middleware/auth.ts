import type { NextFunction, Request, Response } from 'express';

const YANDEX_API_AUTH = `https://ya-praktikum.tech/api/v2/auth/user`;

export async function auth(req: Request, res: Response, next: NextFunction) {
  if (req.headers.cookie && (await cookieExist(req.headers.cookie))) {
    return next();
  } else {
    res.statusCode = 403;
    res.send('<!doctype html><p>Нет cookie</p>');
  }
}

const cookieExist = async (cookie: string): Promise<boolean> => {
  const response: any = await fetch(YANDEX_API_AUTH, {
    headers: {
      Cookie: cookie,
    },
  });
  const jsonData = await response.json();
  //check exists user by id
  return jsonData?.id ? true : false;
};
