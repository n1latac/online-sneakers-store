import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import cl from './SneakersList.module.css';
import SneakerItem from '../SneakerItem/SneakerItem';

const SneakersList: React.FC = () => {
  const sneakers = useSelector((state: RootState) => state.sneaker.sneakers);

  if (!sneakers || sneakers.length === 0) {
    return null;
  }

  return (
    <div className={cl.sneakersList}>
      {sneakers.length &&
        sneakers.map((item) => (
          <div key={item.id} className={cl.sneakersList__item}>
            <SneakerItem sneaker={item} />
          </div>
        ))}
    </div>
  );
};

export default SneakersList;
