import {
  useEffect,
  useState,
} from 'react';

import {
  cardStatuses,
  gameStatuses,
} from '../constants';
import utils from '../utils';

const {
  AVAILABLE,
  CANDIDATE,
  USED,
  WRONG,
} = cardStatuses;

const {
  ACTIVE,
  LOST,
  WON,
} = gameStatuses;

const SECONDS = Number.POSITIVE_INFINITY;

const generateCards = async (gridSize, numMaxCandidateCards) => {
  const cardNumbers = utils.range(1, (gridSize ** 2) / numMaxCandidateCards);
  const cards = [];
  for (const number of cardNumbers) {
    cards.push({
      number,
      url: await utils.getRedirectUrl(`https://picsum.photos/100/100?random=${number}`),
    });
  }

  const shuffled = utils.shuffle([...cards, ...cards]);
  return shuffled.map((card, index) => ({
    index,
    ...card,
  }));
};

const useGameState = (gridSize, numMaxCandidateCards) => {
  const [cards, setCards] = useState([]);
  const [availableCards, setAvailableCards] = useState(null);
  const [candidateCards, setCandidateCards] = useState([]);
  const [gameStatus, setGameStatus] = useState(ACTIVE);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS);

  const loadCards = () => {
    generateCards(gridSize, numMaxCandidateCards).then((generatedCards) => {
      setCards(generatedCards);
      setAvailableCards(availableCards || generatedCards);
    });
  };

  useEffect(() => {
    loadCards();
  // eslint-disable-next-line lines-around-comment
  // FIXME this only works if this empty array is passed in, but react-hooks/exhaustive-deps doesn't like it
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (secondsLeft > 0) {
      if (availableCards && availableCards.length > 0) {
        const timerId = setTimeout(() => {
          setSecondsLeft(secondsLeft - 1);
        }, 1000);
        return () => clearTimeout(timerId);
      }
    } else {
      setGameStatus(LOST);
    }

    return () => {};
  }, [secondsLeft, availableCards]);

  const setGameState = (card, setStatus) => {
    const newCandidateCards = card.status === AVAILABLE
      ? [
        ...candidateCards, {
          ...card,
          setStatus,
        },
      ]
      : candidateCards.filter((candidateCard) => candidateCard !== card);

    const newCandidateCardIndices = new Set(Object.values(newCandidateCards).map((card) => card.index));
    let newAvailableCards = [...availableCards];
    if (newCandidateCards.length === numMaxCandidateCards) {
      if (utils.allEqual(Object.values(newCandidateCards).map((card) => card.number))) {
        newAvailableCards = availableCards.filter((card) => !newCandidateCardIndices.has(card.index));
        newCandidateCards.forEach((card) => {
          card.setStatus(USED);
        });
      } else {
        newCandidateCards.forEach((card) => {
          card.setStatus(WRONG);
        });

        setTimeout(() => {
          newCandidateCards.forEach((card) => {
            card.setStatus(AVAILABLE);
          });
        }, 1000);
      }

      setAvailableCards(newAvailableCards);
      setCandidateCards([]);
    } else {
      setCandidateCards(newCandidateCards);
      newCandidateCards.forEach((card) => {
        card.setStatus(CANDIDATE);
      });
    }

    if (newAvailableCards?.length === 0) {
      setGameStatus(WON);
    }
  };

  return {
    cards,
    gameStatus,
    secondsLeft,
    setGameState,
  };
};

export default useGameState;
