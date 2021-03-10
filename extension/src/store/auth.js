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

      return;

    } catch (error) {
      console.log('Error', error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
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
      state.user = null;

      sessionStorage.setItem('UserLogged', false);
    }
  },
  extraReducers: {
    [signupUser.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Try allowing storage permission for this extension';
    },
    [loginUser.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { errorMessage }) => {
      console.log('payload', errorMessage);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = errorMessage;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
