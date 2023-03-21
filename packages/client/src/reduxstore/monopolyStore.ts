import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import playersReducer from './players/playersSlice';

//здесь будут редьюсеры нашего приложения
const appReducer = {
  user: userReducer,
  players: playersReducer,
};

export const store = configureStore({
  reducer: appReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
