import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Storage from '../helpers/Storage';
import { encrypt, decrypt } from '../helpers/crypto';
import { v4 as uuidv4 } from 'uuid'

const bip39 = require('bip39')
export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({ password }, thunkAPI) => {
    try {
      const id = uuidv4()
      const at = Date.now()
      const name = 'Account 1'
      const walletMnemonic = bip39.generateMnemonic()
      console.log('checking mnemonic')
      console.log(walletMnemonic)
      const wallet = { id, name, mnemonic: walletMnemonic, at, imported: false }

      //This is how user will use its password, we never save it
      // Its just used to unlock his wallet
      const { encrypted: encryptedWallets, keySalt } = await encrypt(
        JSON.stringify([wallet]),
        password
      )
      await Storage.setItem('EncryptedWallet', encryptedWallets)
      await Storage.setItem('LastkeySalt', keySalt);
      return encryptedWallets
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async ({ password }, thunkAPI) => {
    try {
      const userKeySalt = await Storage.getItem('LastkeySalt');
      const encryptedWallet = await Storage.getItem('EncryptedWallet')
      console.log(userKeySalt)
      const decryptedwallet = await decrypt(encryptedWallet, password, userKeySalt);
      console.log("checking decrypted wallet")
      console.log(decryptedwallet)
      if (!decryptedwallet) throw new Error('Incorrect password. Try again.');
      await Storage.setItem('UserLogged', true);
      await Storage.setItem('LastLoginAt', Date.now());
      const payload = { decryptedwallet: decryptedwallet, at: Date.now() }
      return payload
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
    encryptedWallet: 'lele',
    unlockedAt: null

  },
  reducers: {
    clearState: (state) => {
      console.log('state being cleaned')
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      console.log(payload)
      state.encryptedwallet = payload; //This need to be a state that persists through application lifecicle (maybe insert at background)
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      console.log('changing state')
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      console.log("The wallet decrypted")
      console.log(payload.decryptedwallet)
      console.log(payload)
      state.decryptedwallet = payload.decryptedwallet;
      state.unlockedAt = payload.at;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log('changing state')
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
