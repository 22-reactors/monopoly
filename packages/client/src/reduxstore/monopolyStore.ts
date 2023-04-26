import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import playersReducer from './players/playersSlice';
import buyingCardInfoReducer from './game/buyingCardInfoSlice';
import { isServer } from '../utils/helpers';

export const appReducer = combineReducers({
  user: userReducer,
  players: playersReducer,
  buyingCardInfo: buyingCardInfoReducer,
});

let initialState;

if (!isServer) {
  initialState = window.initialState;
  delete window.initialState;
}

export const store = configureStore({
  reducer: appReducer,
  preloadedState: initialState,
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
