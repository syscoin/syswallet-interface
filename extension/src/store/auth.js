import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Storage from '../helpers/Storage';
import { encrypt, decrypt } from '../helpers/crypto';

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({ password }, thunkAPI) => {
    try {
      //add cryptography for password
      const encryptedPassword = encrypt(password, '123422');

      console.log('encrypted', encryptedPassword)

      console.log('pass', password)

      await Storage.setItem('vault', password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async ({ password }, thunkAPI) => {
    try {
      // check through cryptography hash  
      const userPass = await Storage.getItem('vault');

      if (userPass !== password) {
        throw new Error('Incorrect password. Try again.');
      }

      sessionStorage.setItem('UserLogged', true);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userPassword: null,
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
    logout: (state) => {
      state.userPassword = null;

      sessionStorage.setItem('UserLogged', false);
    }
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
    [loginUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.userPassword = action.payload;
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

export const { logout, clearState } = authSlice.actions;
export const selectUser = (state) => state.auth;

export default authSlice.reducer;
