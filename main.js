
let dealerNode = document.querySelector('.dealer-button')
let playersNode = document.querySelector('.players')


class Game {
    constructor(playerNames){
        this.playerNames = playerNames
        this.Players = []
        this.singlePlayer = true
    }

    startGame(){
        if (this.playerNames.length === 1){
            const player = new Player(this.playerNames[0])
            this.Players.push(player)
            const dealer = new Dealer('Dealer')
            this.Players.push(dealer)
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
            dealerNode.appendChild(this.Players[0].createPlayer())
            playersNode.appendChild(this.Players[1].createPlayer())
        }else {
        this.Players.map((player)=>
        playersNode.appendChild(player.createPlayer()))
        }
    }

    checkForWinnerOnStart(){
        let playersLeft = this.Players.filter(player => player.score< 22)
        if (playersLeft.length === 1){
            playersLeft[0].playerWon = true
        }
        if (this.singlePlayer){
            if (this.Players[0].playerWon){
                this.endGame()
            }
        }else {
            // if there are/is a winnig player in all players end game
            const winningPlayer = this.Players.filter((player)=> player.playerWon)
            if (winningPlayer.length > 0){
                this.endGame()
            } 
        }

    }
    checkForWinnerOnGameEnd(){
        if (this.singlePlayer){
           this.Players[0].score > this.Players[1]?alert('You Won'):alert('Dealer have won')
        } else {
            let tie = false
            let maxScore = 0;
            let winnerName ='';
            for (let i = 0; i < this.Players.length; i += 1){
                if (this.Players[i].score > maxScore){
                    maxScore = this.Players[i].score
                    winnerName = this.Players[i].name
                    tie = false
                }
                else if (this.Players[i].score === maxScore){
                    tie = true
                }
            }
        }    

    }
}

    
class Dealer {
    constructor(name){
    this.name = name
    this.isActive = false
    this.score = 0
    this.playerLost = false
    this.playerWon = false
    }
    
    dealerTurn (){
        console.log('dealer turn runs')
        let playerScore = document.getElementsByTagName('p')
        let scoreToHit = playerScore[1].innerHTML
        while (this.score > scoreToHit){
            this.score += Math.round(Math.random()* 11)
        }
        if (this.score > 21){
            this.playerLost = true
        }
    }


    createPlayer(name= this.name) {
        let playerName = document.createElement('div')
        playerName.innerHTML =`${name}`
        playerName.className = `${name}-player`
        let cards = document.createElement('p')
        cards.innerHTML = `${name}'s cards`
        cards.className =`${name}-cards`
        let score = document.createElement('p')
        score.innerHTML = "00"
        score.className = `${name}-score`
        playerName.appendChild(cards)
        playerName.appendChild(score)
            if (this instanceof Player) {
            let hitButton = document.createElement("BUTTON")
            hitButton.innerHTML = 'Hit Me!'
            hitButton.className = `${name}-hit-button`
            let passButton = document.createElement("BUTTON")
            passButton.innerHTML = "Pass"
            passButton.className = `${name}-fold-button`
            playerName.appendChild(hitButton)
            playerName.appendChild(passButton)
            }
        return playerName
    }
}


class Player extends Dealer{
    constructor(name){
        super()
        this.name = name;
        this.score = 13;
        this.isActive = false;
        this.playerWon = false;
        this.playerLost = false
        this.passHandle = this.passHandle.bind(this);
        this.hitMeHandle = this.hitMeHandle.bind(this);
    }


    hitMeHandle(){
        this.score += Math.round(Math.random()* 11)
        let playerScore = document.querySelector(`.${this.name}-score`)
        playerScore.innerHTML = this.score
        if (this.score >= 21){
            this.isActive = false
            if (this.score > 21){
                this.playerLost = true
            }
            this.endTurn()
        }
    }

    passHandle(){
        this.endTurn()
    }


    startTurn(name = this.name) {
        this.isActive =true 
        let hitMeButton = document.querySelector(`.${name}-hit-button`)
        let passButton = document.querySelector(`.${name}-fold-button`)

        hitMeButton.addEventListener('click',this.hitMeHandle)
        passButton.addEventListener('click',this.passHandle )
        this.hitMeHandle()
        this.hitMeHandle()
        if (this.score == 22){
            this.playerWon = true
        }
    }

    endTurn(name=this.name){
        this.isActive = false
        let hitMeButton = document.querySelector(`.${name}-hit-button`)
        let passButton = document.querySelector(`.${name}-fold-button`)

        hitMeButton.removeEventListener('click', this.hitMeHandle)
        passButton.removeEventListener('click', this.passHandle)
    }

}


let newgame = new Game(['Jacek'])
newgame.startGame()
newgame.setupPlayers()
console.log(newgame.Players)
newgame.Players[0].startTurn()
console.log(newgame.Players[1])
newgame.Players[1].dealerTurn()
