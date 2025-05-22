import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interfaces';

interface UserState {
  user: User | null;
  isAuth: boolean;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
