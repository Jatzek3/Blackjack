import { createPlayer } from 
console.log(createPlayer)

let delearCards = document.querySelector(".dealer-cards")
let dealerScore = document.querySelector('.dealer-score')
let playerName = document.querySelector('.player-name')
let playerCards = document.querySelector('.player-cards')
let playerScore = document.querySelector('.player-score')

class Game {
    constructor(playerNames){
        this.playerNames = playerNames
        this.Players =[]
        this.singlePlayer = true
    }

    startGame(){
        if (this.playerNames.length === 1){
            const dealer = new Dealer /*Napisac klasę deler? */
            this.Players.push(dealer)
            const player = new Player(this.playerNames[0])
            this.Players.push(player)
            console.log('run')
            console.log(this.Players)
        }   
        else{
            this.singlePlayer = false
            for (let i = 0; i <this.playerNames.length; i++ ){
                this.Players.push(new Player(this.playerNames[i]))
            }
        }
        }
    setupPlayers(){
        if (this.singlePlayer){
            // dealer setup
        }
        this.Players.map((Player)=> Player)
    }
    }


class Dealer{

}


class Player {
    constructor(name){
        this.name = name;
    }


}
console.log('this runs')
let newgame = new Game(['Jacek'])
newgame.startGame()

