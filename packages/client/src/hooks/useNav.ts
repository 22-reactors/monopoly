import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../reduxstore/hooks';
import { userSelector } from '../reduxstore/user/user.selector';

export const useNav = (path: string, isProtectedRoute: boolean) => {
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);

  useEffect(() => {
    if ((isProtectedRoute && !user) || (!isProtectedRoute && user)) {
      navigate(path);
    }
  }, [user]);
};
