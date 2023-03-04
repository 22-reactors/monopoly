import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../monopolyStore';

export const playersSelector = (state: RootState) => state.players;

export const playersNumberSelector = createSelector(
  [playersSelector],
  playersSlice => playersSlice.length
);
