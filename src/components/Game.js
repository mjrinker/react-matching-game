import React from 'react';

import {
  cardStatuses,
  gameStatuses,
} from '../constants';
import useGameState from '../hooks/useGameState';
import utils from '../utils';

import CardRow from './CardRow';
import Loading from './Loading';
import PlayAgain from './PlayAgain';

const { USED } = cardStatuses;
const { ACTIVE } = gameStatuses;

export const Game = ({
  gridSize,
  numMaxCandidateCards,
  startNewGame, // TODO use this
}) => {
  const {
    cards,
    gameStatus,
    secondsLeft,
    setGameState,
  } = useGameState(gridSize, numMaxCandidateCards);

  const onCardClick = (card, setStatus) => {
    if (gameStatus !== ACTIVE || card.status === USED) {
      return;
    }

    setGameState(card, setStatus);
  };

  return (
    <div className='game-board'>
      <div className='game-board-body'>
        <div
          className='play-again'
          style={
            gameStatus === ACTIVE ? {} : {
              backgroundColor: '#000000bb',
              zIndex: 50,
            } // eslint-disable-line react/jsx-indent
          }
        >
          {
            gameStatus === ACTIVE ? '' : (
              <PlayAgain
                onClick={startNewGame}
                status={gameStatus}
              />
            )
          }
        </div>
        {
          cards?.length > 0
            ? (
              <div className='card-rows'>
                {utils.range(1, gridSize).map((number, index) => (
                  <CardRow
                    cards={cards.slice(index * gridSize, number * gridSize)}
                    key={number}
                    onCardClick={onCardClick}
                    row={number}
                  />
                ))}
              </div>
            )
            : <Loading message='Creating your card deck...' />
        }
      </div>
      <div className='timer'>Time Remaining: {secondsLeft === Number.POSITIVE_INFINITY ? <span className='infinity'>∞</span> : secondsLeft}</div>
    </div>
  );
};

export default Game;
