import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import appReducer from './application';

export default configureStore({
  reducer: {
    auth: authReducer,
    applicationState: appReducer,
  }
})