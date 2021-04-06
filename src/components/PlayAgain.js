import React from 'react';

const PlayAgain = ({
  onClick,
  status,
}) => (
  <div className='game-done'>
    <div
      className='message'
      style={{ color: status === 'lost' ? 'red' : 'green' }}
    >
      {status === 'lost' ? 'Game Over' : 'Victory!'}
    </div>
    <button
      onClick={onClick}
      type='button'
    >Play Again
    </button>
  </div>
);

export default PlayAgain;
