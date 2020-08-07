const fetch = require('node-fetch');
let { Manager, Game, Deck, Dealer, Player, validName } = require('./main.js');

beforeEach((done) => {
  document.body.innerHTML =
    "<div class='dealer-button'></div>" + "<div class='players'><div>";

  return new Promise((resolve, reject) => {
    let dealerNode = document.querySelector('.dealer-button');
    let playersNode1 = document.querySelector('.players');
    console.log(playersNode1);
    playersNode = jest.fn();
    playersNode.mockReturnValueOnce(playersNode1);
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
