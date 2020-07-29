let delearCards = document.querySelector(".dealer-cards")
let dealerScore = document.querySelector('.dealer-score')
let playerName = document.querySelector('.player-name')
let playerCards = document.querySelector('.player-cards')
let playerScore = document.querySelector('.player-score')

class Game {
    constructor(playerNames){
        this.playerNames = playerNames
        this.Players =[]
    }

    startGame(){
        if (this.playerNames.length === 1){
            const dealer = new Dealer /*Napisac klasę deler? */
            this.Players.push(dealer)
            const player = new Player
            this.Players.push(player)
        }   
        else{
            for (let i = 0; i <this.playerNames.length; i++ ){
                this.Players.push(new Player(this.playerNames[i]))
            }
        }
        }
    }

class Dealer{

}


class Player {
    constructor(name){
        this.name = name;
    }
    playerSetup(){
        let nameNode = document.createTextNode(`${this.name}`);
        playerName.appendChild(NameNode)



    }

}

