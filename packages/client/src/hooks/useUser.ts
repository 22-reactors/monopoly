import { useEffect, useState } from 'react';
import { IUserData } from '../api/auth/interfaces';
import AuthController from '../controllers/auth';

export const useUser = (initialValue = null) => {
  const [user, setUser] = useState<IUserData | null>(initialValue);

  useEffect(() => {
    const getUser = async () => {
      const user = await AuthController.getUser();
      if (user) {
        setUser(user);
      }
    };

    getUser();
  }, []);

  return [user, setUser] as const;
};
