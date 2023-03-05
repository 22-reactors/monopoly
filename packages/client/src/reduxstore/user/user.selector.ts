import { RootState } from '../monopolyStore';

export const userSelector = (state: RootState) => state.user.user;
