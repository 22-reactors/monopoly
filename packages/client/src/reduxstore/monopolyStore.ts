import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import playersReducer from './players/playersSlice';
import buyingCardInfoReducer from './game/buyingCardInfoSlice';

const appReducer = combineReducers({
  user: userReducer,
  players: playersReducer,
  buyingCardInfo: buyingCardInfoReducer,
});

export const store = configureStore({
  reducer: appReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
