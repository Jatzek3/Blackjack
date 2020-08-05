let {
  Manager,
  Game,
  Deck,
  Dealer,
  Player,
  validName,
  actualGame,
  turnStarted,
  shuffleReady,
  playersNode,
  dealerNode,
} = require('./main.js');
const { TestScheduler } = require('jest');

beforeEach(() => {
  let manager = new Manager();
  let newDeck = new Deck();
  const deckReady = newDeck
    .getNewDeck()
    .then(() => {
      newDeck.shuffle();
    })
    .then(() => {
      manager.initialization();
    })
    .then(() => {
      manager.newGame();
    })
    .catch(() => console.log('errpr on '));
  console.log('setup ready');
});

const sum = (x, y) => x + y;

test('checking test', () => {
  expect(sum(1, 2)).toBe(3);
});
