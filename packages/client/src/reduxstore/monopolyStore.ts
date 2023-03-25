import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import playersReducer from './players/playersSlice';
import buyingCardInfoReducer from './game/buyingCardInfoSlice';

export const appReducer = combineReducers(combineReducers({
  user: userReducer,
  players: playersReducer,
  buyingCardInfo: buyingCardInfoReducer,
}));

let initialState;

if (typeof window !== 'undefined' &&
window.document) {
  initialState = window.initialState;
  delete window.initialState;
}

export const store = configureStore({
  reducer: appReducer,
  preloadedState: initialState,
});

//export 

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
