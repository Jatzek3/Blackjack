const fetch = require('node-fetch');
let { Manager, Game, Deck, Dealer, Player, validName } = require('./main.js');

afterEach(() => {
  window.prompt.mockClear();
});

describe('testing initialization', () => {
  test('testing initializaton of the game', async () => {
    // Initialization
    document.body.innerHTML =
      "<div class='dealer-button'></div>" + "<div class='players'><div>";

    let manager = new Manager();
    let newDeck = new Deck();

    //  setting Mocks for the game
    window.prompt = jest.fn(() => 'Player name and number of players'); //enter yes for single player enter number for multiplayer
    window.alert = jest.fn(() => 'Winner announcement');

    let dealerNode1 = document.querySelector('.dealer-button');
    dealerNode = jest.fn();
    dealerNode.mockReturnValueOnce(dealerNode1);

    let playersNode1 = document.querySelector('.players');
    playersNode = jest.fn();
    playersNode.mockReturnValueOnce(playersNode1);

    // for the initial setup
    const mockOfNeGameReturn = jest.fn();
    mockOfNeGameReturn.mockReturnValueOnce(1);
    manager.newGame = jest.fn(() => {
      return mockOfNeGameReturn();
    });

    await newDeck
      .getNewDeck()
      .then(() => {
        newDeck.shuffle();
      })
      .then(() => {
        manager.initialization();
      })
      .then(() => {
        manager.newGame();
      });
  });
});
