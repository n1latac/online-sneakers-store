import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Type } from '../interfaces';

interface TypeState {
  types: Type[];
  selectedType: Type | null;
}

const initialState: TypeState = {
  types: [],
  selectedType: null,
};

const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setTypes: (state, action: PayloadAction<Type[]>) => {
      state.types = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<Type>) => {
      state.selectedType = action.payload;
    },
  },
});

export const { setTypes, setSelectedType } = typeSlice.actions;
export default typeSlice.reducer;
