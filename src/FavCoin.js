
import React from 'react';
import './FavCoin.css';

//Js to render favarite coins from database user's table.
const FavCoin = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
  icon
}) => {
  return (
    <div className='coin-container2'>
      <div className='coin-row2'>
        <div className='coin2'>
          <img src={image} alt='crypto' />
          <h1>{name}</h1>
          <p className='coin-symbol2'>{symbol}</p>
        </div>
        <div className='coin-data2'>
          <p className='coin-price2'>${price}</p>
          <p className='coin-volume2'>${volume.toLocaleString()}</p>

          {priceChange < 0 ? (
            <p className='coin-percent red2'>{priceChange.toFixed(2)}%</p>
          ) : (
            <p className='coin-percent green2'>{priceChange.toFixed(2)}%</p>
          )}

          <p className='coin-marketcap2'>
            Mkt Cap: ${marketcap.toLocaleString()}
          </p>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default FavCoin;
