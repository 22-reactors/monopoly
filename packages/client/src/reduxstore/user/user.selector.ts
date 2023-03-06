import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../monopolyStore';

export const selectUser = (state: RootState) => state.user;

export const userSelector = createSelector([selectUser], state => state.user);

export const userErrorSelector = createSelector(
  [selectUser],
  state => state.error 
);
