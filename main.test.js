const fetch = require('node-fetch');
let { Manager, Game, Deck, Dealer, Player, validName } = require('./main.js');

beforeEach((done) => {
  return new Promise((resolve, reject) => {
    dealer = document.createElement('div');
    dealer.classList.add('dealer-button');
    player = document.createElement('div');
    player.classList.add('players');
    document.body.appendChild(dealer);
    document.body.appendChild(player);
    dealerNode = jest.fn(() => dealer);
    playersNode = jest.fn(() => player);
    window.prompt = jest.fn(() => '6');
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
      .catch((error) => console.log(done(error)));
    resolve();
  });
});

afterEach(() => {
  window.prompt.mockClear();
});

const sum = (x, y) => x + y;

test('checking test', () => {
  expect(sum(1, 2)).toBe(3);
});
