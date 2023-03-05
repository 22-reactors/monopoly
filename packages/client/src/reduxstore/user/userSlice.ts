import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginData, ISignUpData, IUserData } from '../../api/auth/interfaces';
import AuthController, { isSignUpGoodResponse } from '../../controllers/auth';

export const getUser = createAsyncThunk('user/getUser', async () => {
  return await AuthController.getUser();
});

export const logoutAction = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    await AuthController.logout();
    dispatch(getUser());
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (data: ILoginData, { dispatch }) => {
    const response = await AuthController.login(data);
    if (response === 'OK') {
      dispatch(getUser());
    } else {
      return response?.reason;
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async (data: ISignUpData, { dispatch }) => {
    const response = await AuthController.signup(data);
    if (response) {
      if (isSignUpGoodResponse(response)) {
        dispatch(getUser());
      } else {
        return response.reason;
      }
    }
  }
);

interface IUserState {
  user: IUserData | null;
  loading: boolean;
  error?: string;
}

const initialState: IUserState = { user: null, loading: false };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state, action: PayloadAction<string | undefined>) => {
      const error = action.payload;
      state.error = error;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      const user = action.payload;
      state.user = user ? { ...user } : null;
      state.loading = false;
    });
    builder.addCase(getUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(logoutAction.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(logoutAction.pending, state => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(login.pending, state => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(signUp.pending, state => {
      state.loading = true;
    });
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;
