# Blackjack

This repository holds files to game of blackjack created for Profil Software internship task.
You can play the game on  https://jatzek3.github.io/Blackjack/

## Rules & Gameplay

You can choose between single player game or multiplayer game with custom amount players.
Each card is worth point value according to its number. If it is a face card or an ace the points are as follows:
Jack - 2 points
Queen - 3 points
King - 4 points
Ace - 11 points

### Single Player
 - If you choose to play against AI you will be the first to draw cards. If the cards are two aces  you win instantly and the game is ended. 
 - Player may choose to draw a card to increase his points or pass to stay in game and count that his score will hold up against an opponent.
 - If players score exceeds  21  points, his turn is over and he losses the game.
 - If player stayed in the game and the AI went over 21 points the he wins the game.
 - If player stayed in the game and AI score is higher then players. AI Wins the game
 
 ### Multiplayer
 - At the start of the turn each player draws two cards. If the cards are two aces  this player win instantly and the game is ended. 
 - Player may choose to draw a card to increase his points or pass to stay in game and count that his score will hold up against an opponents.
 - If players score exceeds  21  points, his turn is over and he losses the game. Next player turn starts.
 - If there is only one remaining player and rest of the players have 22 points or more. Last player is the winner.
 - When last player finishes his turn. All scores are compared and the winner who has the most points but less than 22 wins. If there are two players with the highest score its a tie.
