import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

//здесь будут редьюсеры нашего приложения
const appReducer = {
  user: userReducer,
};

export const store = configureStore({
  reducer: appReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
