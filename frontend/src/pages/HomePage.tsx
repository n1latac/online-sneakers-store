import React, { useEffect } from 'react';
import cl from '../styles/Home.module.css';
import TypeBar from '../components/TypeBar/TypeBar';
import BrandBar from '../components/BrandBar/BrandBar';
import SneakersList from '../components/SneakersList/SneakersList';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

import { useGetTypesQuery } from '../api/typeApi';
import { useGetBrandsQuery } from '../api/brandApi';
import { useGetSneakersQuery } from '../api/sneakerApi';

import { setTypes } from '../store/typeSlice';
import { setBrands } from '../store/brandSlice';
import { setSneakers } from '../store/sneakerSlice';
const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  const selectedType = useSelector(
    (state: RootState) => state.type.selectedType,
  );
  const selectedBrand = useSelector(
    (state: RootState) => state.brand.selectedBrand,
  );
  const page = useSelector((state: RootState) => state.sneaker.page);

  const { data: types } = useGetTypesQuery();
  const { data: brands } = useGetBrandsQuery();
  const { data: sneakersData } = useGetSneakersQuery({
    type_id: selectedType?.id,
    brand_id: selectedBrand?.id,
    page,
    limit: 8,
  });

  useEffect(() => {
    if (types) {
      dispatch(setTypes(types?.data));
    }
  }, [types?.data, dispatch]);

  useEffect(() => {
    if (brands) {
      dispatch(setBrands(brands?.data));
    }
  }, [brands?.data, dispatch]);

  useEffect(() => {
    if (sneakersData) {
      dispatch(setSneakers(sneakersData?.data));
    }
  }, [sneakersData?.data, dispatch]);

  return (
    <div className={cl.shopContainer}>
      <div className={cl.sidebar}>
        <TypeBar />
      </div>
      <div className={cl.mainContent}>
        <BrandBar />
        <SneakersList />
        {/* <Pages /> */}
      </div>
    </div>
  );
};

export default HomePage;
