const fetch = require('node-fetch');
let { Manager, Game, Deck, Dealer, Player, validName } = require('./main.js');

beforeEach(async () => {
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
  mockOfNeGameReturn.mockReturnValueOnce(console.log('mock game starts'));
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

afterEach(() => {
  window.prompt.mockClear();
});

describe('testing initialization', () => {
  test('testing singleplayer with default name', () => {
    let manager = new Manager();
    expect(manager.initialization()).toBe(1);
  });

  // test('testing newGame', () => {
  //   let manager = new Manager();
  //   manager.gameArray = [];
  //   manager.gameIndexCounter = 0;
  //   manager.gameArray.push(new Game());
  //   manager.gameArray[0].startGame = jest.fn();
  //   manager.gameArray[0].setupPlayers = jest.fn();
  //   manager.gameArray[0].Players[new Player()];
  //   expect(manager.newGame()).toBe(1);
  // });
});
