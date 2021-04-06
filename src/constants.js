const cardStatuses = {
  AVAILABLE: 'available',
  CANDIDATE: 'candidate',
  USED: 'used',
  WRONG: 'wrong',
};

const colors = {
  [cardStatuses.AVAILABLE]: 'transparent',
  [cardStatuses.CANDIDATE]: '#00B2F1',
  [cardStatuses.USED]: '#86DA84',
  [cardStatuses.WRONG]: '#F64726',
};

const gameStatuses = {
  ACTIVE: 'active',
  LOST: 'lost',
  WON: 'won',
};

export {
  cardStatuses,
  colors,
  gameStatuses,
};
