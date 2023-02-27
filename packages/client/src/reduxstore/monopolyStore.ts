import { configureStore } from '@reduxjs/toolkit';

//здесь будут редьюсеры нашего приложения
const appReducer = {
};

export const store = configureStore({
  reducer: appReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
