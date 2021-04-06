import * as React from 'react';

import Card from './Card';

const CardRow = ({
  cards,
  row,
  onCardClick,
}) => (
  <div className='card-row'>
    {cards.map((card, index) => (
      <Card
        column={index + 1}
        imageUrl={card.url}
        index={card.index}
        key={card.index}
        number={card.number}
        onClick={onCardClick}
        row={row}
      />
    ))}
  </div>
);

export default CardRow;
