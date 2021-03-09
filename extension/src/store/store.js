import { configureStore } from '@reduxjs/toolkit';
import userReducer from './auth';



export default configureStore({
  reducer: {
    user: userReducer,
    //applicationState: appReducer,
  }
})