import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserData } from '../../api/auth/interfaces';
import AuthController from '../../controllers/auth';

export const getUser = createAsyncThunk('user/getUser', async () => {
  const user = await AuthController.getUser();
  return user;
});

interface IUserState {
  user: IUserData | null;
  loading: boolean;
}

const initialState: IUserState = { user: null, loading: false };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      const user = action.payload;
      if (user) {
        state.user = { ...user };
      }
    });
  },
});

export default userSlice.reducer;
