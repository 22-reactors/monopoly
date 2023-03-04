import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './players/playersSlice';

//здесь будут редьюсеры нашего приложения
const appReducer = {
  players: playersReducer
};

export const store = configureStore({
  reducer: appReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
