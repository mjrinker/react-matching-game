import React from 'react';

import MemoryMatch from './MemoryMatch';

const GRID_SIZE = 4;
const NUM_MAX_CANDIDATE_CARDS = 2;

export const App = () => (
  <MemoryMatch
    gridSize={GRID_SIZE}
    numMaxCandidateCards={NUM_MAX_CANDIDATE_CARDS}
  />
);
