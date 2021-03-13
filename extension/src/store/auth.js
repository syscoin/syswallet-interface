import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Storage from '../helpers/Storage';
import { encrypt, decrypt } from '../helpers/crypto';

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({ password }, thunkAPI) => {
    try {
      const encryptedPassword = await encrypt(password, 'fake-key');

      await Storage.setItem('vault', encryptedPassword);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async ({ password }, thunkAPI) => {
    try {
      const userPass = await Storage.getItem('vault');
      const decryptedPassword = await decrypt(userPass.encrypted, 'fake-key', userPass.keySalt);

      if (password !== decryptedPassword) {
        throw new Error('Incorrect password. Try again.');
      }

      await Storage.setItem('UserLogged', true);
      await Storage.setItem('LastLoginAt', Date.now());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.userPassword = payload;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.userPassword = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState } = authSlice.actions;
export const selectUser = (state) => state.auth;

export default authSlice.reducer;
