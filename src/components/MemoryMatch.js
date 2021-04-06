import React, { useState } from 'react';

import Game from './Game';

const MemoryMatch = ({
  gridSize,
  numMaxCandidateCards,
}) => {
  const [gameId, setGameId] = useState(1);
  return (
    <Game
      gridSize={gridSize}
      key={gameId}
      numMaxCandidateCards={numMaxCandidateCards}
      startNewGame={() => setGameId(gameId + 1)}
    />
  );
};

export default MemoryMatch;
