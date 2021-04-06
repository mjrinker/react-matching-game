import React, { useState } from 'react';

import {
  cardStatuses,
  colors,
} from '../constants';

const {
  AVAILABLE,
  USED,
} = cardStatuses;

const FLIPPED_Z_INDEX = {
  [false]: 10,
  [true]: 30,
};

const Card = ({
  column,
  imageUrl,
  index,
  number,
  onClick,
  row,
}) => {
  const [status, setStatus] = useState(AVAILABLE);
  const flipped = status !== AVAILABLE;
  const borderColor = colors[status];

  const handleEvent = () => {
    onClick({
      index,
      number,
      status,
    }, setStatus);
  };

  return (
    <div
      className='card-container'
      onClick={handleEvent}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          handleEvent();
        }
      }}
      role='button'
      style={{
        borderColor,
        cursor: status === USED ? 'default' : 'pointer',
      }}
      tabIndex={row * column}
    >
      <div className='card-back' />
      <div
        className='card'
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          borderColor,
          zIndex: FLIPPED_Z_INDEX[flipped],
        }}
      />
    </div>
  );
};

export default Card;
