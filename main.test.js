const fetch = require('node-fetch');
let dealerNode = document.querySelector('.dealer-button');
let playersNode = document.querySelector('.players');
let shuffleReady;
let turnStarted;
let actualGame;

let { Manager, Game, Deck, Dealer, Player, validName } = require('./main.js');

beforeEach((done) => {
  let manager = new Manager();
  let newDeck = new Deck();
  const deckReady = newDeck
    .getNewDeck()
    .then(() => console.log('manager', manager))
    .then(() => {
      newDeck.shuffle();
    })
    .then(() => {
      manager.initialization();
    })
    .then(() => {
      manager.newGame();
    })
    .catch((error) => console.log(done(error)));
});

const sum = (x, y) => x + y;

test('checking test', () => {
  expect(sum(1, 2)).toBe(3);
});
