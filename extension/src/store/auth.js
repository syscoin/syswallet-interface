import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Storage from "../helpers/Storage";

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({ password }, thunkAPI) => {
    try {
      //add cryptography for password
      await Storage.setItem('vault', password);

      return;
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
        return thunkAPI.rejectWithValue('Incorrect password. Try again.');
      }

      sessionStorage.setItem('UserLogged', true);

      return;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
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

      return state;
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
      return state;
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

export const { logout, clearState } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
