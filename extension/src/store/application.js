import { createSlice } from '@reduxjs/toolkit';
import Storage from '../helpers/Storage';

export const userIsLogged = createAsyncThunk(
  'application/userIsLogged',
  async ({ data }, thunkAPI) => {
    try {
      await Storage.setItem('LastLoginAt', data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const logout = createAsyncThunk(
//   'application/logout',
//   async ({ data }, thunkAPI) => {
//     try {
//       await Storage.setItem('UserLogged', false);
//       await Storage.setItem('LastLoginAt', null);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const updateLastLogin = createAsyncThunk(
//   'application/updateLastLogin',
//   async ({ data }, thunkAPI) => {
//     try {
//       await Storage.setItem('LastLoginAt', data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );



export const appSlice = createSlice({
  name: 'applicationState',
  initialState: {
    lastLoginAt: null,
    isLogged: false,
    firstTimeAccount: false,
  },
  reducers: {
    userIsLogged: (state, { payload }) => {
      state.isLogged = payload;
      Storage.setItem('UserLogged', payload);

      return state;
      // add to extra reducer
    },
    logout: (state) => {
      state.isLogged = false;
      state.lastLoginAt = null;

      Storage.setItem('UserLogged', false);
      Storage.setItem('LastLoginAt', null);

      return state;
      // add to extra reducer
    },
    updateLastLogin: (state, { payload }) => {
      state.lastLoginAt = payload;

      Storage.setItem('LastLoginAt', payload);

      return state;

      // add to extra reducer
    },
    setFirstTimeAccount: (state) => {
      state.firstTimeAccount = true;

      return state;
    }
  },
});

export const { logout, updateLastLogin, userIsLogged, setFirstTimeAccount, lastLoginAt } = appSlice.actions;
export const selectState = (state) => state.applicationState;

export default appSlice.reducer;
