import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserData } from '../../api/auth/interfaces';
import AuthController from '../../controllers/auth';

export const getUser = createAsyncThunk('user/getUser', async () => {
  return await AuthController.getUser();
});

export const logout = createAsyncThunk("user/logout", async () => {
  await AuthController.logout();
  return await AuthController.getUser();
})

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
        state.loading = false;
      }
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = true;
    })
  },
});

export default userSlice.reducer;
