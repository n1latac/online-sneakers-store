import { configureStore } from '@reduxjs/toolkit';
import typeReducer from './typeSlice';
import brandReducer from './brandSlice';
import sneakerReducer from './sneakerSlice';
import { api } from '../api';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    type: typeReducer,
    brand: brandReducer,
    sneaker: sneakerReducer,
    user: userSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware), // опционально для RTK Query
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
