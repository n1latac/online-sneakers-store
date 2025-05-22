import React from 'react';
import cl from './TypeBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setSelectedType } from '../../store/typeSlice';

const TypeBar: React.FC = () => {
  const dispatch = useDispatch();
  const types = useSelector((state: RootState) => state.type.types);
  const selectedType = useSelector(
    (state: RootState) => state.type.selectedType,
  );

  return (
    <div className={cl.typeBar}>
      {types.map((type) => (
        <div
          key={type.id}
          className={`${cl.typeItem} ${type.id === selectedType?.id ? cl.active : ''}`}
          onClick={() => dispatch(setSelectedType(type))}
        >
          {type.name}
        </div>
      ))}
    </div>
  );
};

export default TypeBar;
