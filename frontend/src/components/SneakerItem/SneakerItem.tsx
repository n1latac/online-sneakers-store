import React from 'react';
import { useNavigate } from 'react-router-dom';
import star from '../img/star.png';
import { SNEAKER_ROUTE } from '../../utils/constants';
import { Sneaker } from '../../interfaces';
import cl from './SneakerItem.module.css';

interface SneakerItemProps {
  sneaker: Sneaker;
}

const SneakerItem: React.FC<SneakerItemProps> = ({ sneaker }) => {
  const navigate = useNavigate();
  console.log(sneaker, 'here');

  return (
    <div
      className={cl.sneakerItem}
      onClick={() => navigate(`${SNEAKER_ROUTE}/${sneaker.id}`)}
    >
      <div className={cl.sneakerItem__imageWrapper}>
        <img
          className={cl.sneakerItem__image}
          src={`${process.env.REACT_APP_API_URL}uploads/${sneaker.img}`}
          alt={sneaker.name}
        />
      </div>

      <div className={cl.sneakerItem__details}>
        <span className={cl.sneakerItem__brand}>{sneaker.brand?.name}</span>
        <span className={cl.sneakerItem__rating}>
          {sneaker.rating}
          {/*<img className={cl.sneakerItem__star} src={star} alt="star" />*/}
        </span>
      </div>

      <div className={cl.sneakerItem__name}>{sneaker.name}</div>
    </div>
  );
};

export default SneakerItem;
