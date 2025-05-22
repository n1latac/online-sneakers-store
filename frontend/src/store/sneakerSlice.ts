import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sneaker } from '../interfaces';

interface SneakersState {
  sneakers: Sneaker[];
  page: number;
}

const initialState: SneakersState = {
  sneakers: [],
  page: 1,
};

const sneakerSlice = createSlice({
  name: 'sneaker',
  initialState,
  reducers: {
    setSneakers: (state, action: PayloadAction<Sneaker[]>) => {
      state.sneakers = action.payload;
    },
  },
});

export const { setSneakers } = sneakerSlice.actions;
export default sneakerSlice.reducer;
