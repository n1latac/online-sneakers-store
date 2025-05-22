import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Brand } from '../interfaces';

interface BrandState {
  brands: Brand[];
  selectedBrand: Brand | null;
}

const initialState: BrandState = {
  brands: [],
  selectedBrand: null,
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setBrands: (state, action: PayloadAction<Brand[]>) => {
      state.brands = action.payload;
    },
    setSelectedBrand: (state, action: PayloadAction<Brand>) => {
      state.selectedBrand = action.payload;
    },
  },
});

export const { setBrands, setSelectedBrand } = brandSlice.actions;
export default brandSlice.reducer;
