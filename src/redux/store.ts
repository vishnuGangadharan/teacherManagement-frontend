import { configureStore } from '@reduxjs/toolkit';
import authSlice from './userSlice';
import studentSlice from './studentSlice';
const store  = configureStore({
    reducer: {
        auth:authSlice,
        student: studentSlice,
    },
   
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;