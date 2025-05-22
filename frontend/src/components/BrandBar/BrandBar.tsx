import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSelectedBrand } from '../../store/brandSlice';

const BrandBar: React.FC = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state: RootState) => state.brand.brands);
  const selectedBrand = useSelector(
    (state: RootState) => state.brand.selectedBrand,
  );

  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap', marginTop: '60px' }}>
      {brands.map((brand) => (
        <div
          key={brand.id}
          onClick={() => dispatch(setSelectedBrand(brand))}
          style={{
            padding: '10px',
            border: '1px solid',
            borderColor: brand.id === selectedBrand?.id ? 'black' : 'lightgray',
            marginRight: '10px',
            cursor: 'pointer',
            width: 'calc(25% - 10px)',
            textAlign: 'center',
          }}
        >
          {brand.name}
        </div>
      ))}
    </div>
  );
};

export default BrandBar;
