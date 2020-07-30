
let dealerNode = document.querySelector('.dealer-button')
let playersNode = document.querySelector('.players')


class Game {
    constructor(playerNames){
        this.playerNames = playerNames
        this.Players = []
        this.singlePlayer = true
        this.winner = ''
        // Iterator for looping through players
        this.playersIterator = this.Players[Symbol.iterator](); 
    }

    startGame(){
        if (this.playerNames.length === 1){
            const dealer = new Dealer('Dealer')
            this.Players.push(dealer)
            const player = new Player(this.playerNames[0])
            this.Players.push(player)

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
            this.winner = playersLeft[0].name
            playersLeft[0].playerWon = true
            this.endGame()
        }
        if (this.singlePlayer){
            if (this.Players[0].playerWon){
                this.winner = this.Players[0].name
                this.endGame()
            }
        }else {
            // if there are/is a winnig player in all players end game
            const winningPlayer = this.Players.filter((player)=> player.playerWon)
            if (winningPlayer.length > 0){
                this.winner = winningPlayer[0].name
                this.endGame()
            } 
        }

    }
    checkForWinnerOnGameEnd(){
        let winnerName='';
        if (this.singlePlayer){
           this.Players[0].score > this.Players[1]?this.winner = this.Players[0].name:this.winner = this.Players[1].name
        } else {
            let tie = false
            let maxScore = 0;
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
        tie?this.winner ="It's a tie":this.winner = winnerName
    }
    endGame(){
        // Function goes here
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
        let scoreToHit = playerScore[3].innerHTML
        console.log(scoreToHit)
        while (this.score < scoreToHit){
            console.log('this runs')
            this.score += Math.round(Math.random()* 11)
            let dealerScore = document.querySelector('.Dealer-score')
            dealerScore.innerHTML = this.score
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
        this.score = 0;
        this.isActive = false;
        this.playerWon = false;
        this.playerLost = false
        this.passHandle = this.passHandle.bind(this);
        this.hitMeHandle = this.hitMeHandle.bind(this);
    }


    hitMeHandle(){
        console.log('hitmehandle')
        this.score += Math.round(Math.random()* 11)
        let playerScore = document.querySelector(`.${this.name}-score`)
        playerScore.innerHTML = this.score
        if (this.score >= 21){
            this.isActive = false
            if (this.score > 21){
                this.playerLost = true
            }
            this.endTurn()
            gameArray[gameIndexCounter].playersIterator.next()

        }
    }

    passHandle(){
        this.endTurn()
        if (gameArray[gameIndexCounter].singlePlayer){
            let  object  = gameArray[gameIndexCounter].playersIterator.next()
            object.value.dealerTurn()
        } else {
            let  object  = gameArray[gameIndexCounter].playersIterator.next()
            object.value.startTurn()
        }

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

let gameArray = []
let gameIndexCounter = -1
const initialization = () => {
    let agreement = prompt('Do you want to play a game?','Yes')
    if (agreement){
        let playerNames = []
        gameIndexCounter += 1
        let hero = prompt('What is Your Name', 'Hero')
        playerNames.push(hero)
        let singleOrMulti = prompt('If You want to play aginst the dealer enter yes. If you want to play with friends enter a number of other player', 'yes')
        if (singleOrMulti.toLowerCase == 'yes'){
            gameArray.push(new Game(playerNames))
        } else {
            for (let i = 0; i < +singleOrMulti; i++ ){
                playerNames.push(`Player${i+1}`)
            }
            gameArray.push(new Game(playerNames))
        }
        
    }
}
initialization()
gameArray[gameIndexCounter].startGame()
gameArray[gameIndexCounter].setupPlayers()
if (gameArray[gameIndexCounter].singlePlayer){
    gameArray[gameIndexCounter].Players[1].startTurn()
} else {
    let  object  = gameArray[gameIndexCounter].playersIterator.next()
    object.value.startTurn()
}




// let newgame = new Game(['Jacek'])
// newgame.startGame()
// newgame.setupPlayers()
// //  Loop
// newgame.Players[0].startTurn() // Or dealer if Singleplayer
// newgame.checkForWinnerOnStart()

// console.log(newgame.playersIterator.next())

