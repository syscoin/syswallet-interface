import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Storage from "../helpers/Storage";

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({ password }, thunkAPI) => {
    try {
      //add cryptography for password
      await Storage.setItem('vault', password);

      return password;
    } catch (error) {
      console.log('Error', error);
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
        return thunkAPI.rejectWithValue('incorrect password');
      }

      sessionStorage.setItem('UserLogged', true);

      return userPass;

    } catch (error) {
      console.log('Error', error);
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
    [signupUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.userPassword = action.payload;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = true;
      state.userPassword = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { logout } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
