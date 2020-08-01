let dealerNode = document.querySelector('.dealer-button')
let playersNode = document.querySelector('.players')





class Game {
    constructor(playerNames) {
        this.playerNames = playerNames
        this.Players = []
        this.singlePlayer = true
        this.tie = false
        this.winner = ''
        this.playersIterator = this.Players[Symbol.iterator]();
        this.checkForWinnerOnStart = this.checkForWinnerOnStart.bind(this)
        this.endGame = this.endGame.bind(this)
    }

    startGame() {
        // Problem with shuffling on the start!! - should be shullfed after the deck is fetched 222
        newDeck.shuffle()
        if (this.playerNames.length === 1){
            const dealer = new Dealer('Dealer')
            this.Players.push(dealer)
            const player = new Player(this.playerNames[0])
            this.Players.push(player)

        } else{
            this.singlePlayer = false
            for (let i = 0; i <this.playerNames.length; i++ ){
                this.Players.push(new Player(this.playerNames[i]))
            }
        }
    }

    setupPlayers() {
        if (this.singlePlayer){
            dealerNode.appendChild(this.Players[0].createPlayer())
            playersNode.appendChild(this.Players[1].createPlayer())

        } else {
        this.Players.map((player)=>
        playersNode.appendChild(player.createPlayer()))
        }
    }

    checkForWinnerOnStart() {
        let playersLeft = this.Players.filter(player => player.score< 22)
        console.log(playersLeft)
        if (playersLeft.length === 1){
            this.winner = playersLeft[0].name
            playersLeft[0].playerWon = true
            this.endGame()

        } else if (this.singlePlayer){
            if (this.Players[0].playerWon){
                this.winner = this.Players[0].name
                this.endGame()
            }
         } else {
            const winningPlayer = this.Players.filter((player)=> player.playerWon)
            if (winningPlayer.length > 0){
                this.winner = winningPlayer[0].name
                this.endGame()
            } 
        }

    }

    checkForWinnerOnGameEnd() {
        let playersLeft = this.Players.filter(player => player.score< 22)
        console.log(playersLeft)
        let winnerName='';
        if (this.singlePlayer){
           this.Players[0].score > this.Players[1]?
           this.winner = this.Players[0].name:
           this.winner = this.Players[1].name

        } else {
            let maxScore = 0;
            for (let i = 0; i < this.Players.length; i += 1){
                if (this.Players[i].score > maxScore && this.Players[i].score < 22){
                    maxScore = this.Players[i].score
                    winnerName = this.Players[i].name
                    this.tie = false
                }
                else if (this.Players[i].score === maxScore){
                    this.tie = true
                }
            }
        }
        this.tie?this.winner ="It's a tie":this.winner = winnerName
    }

    endGame(){
        console.log(this.winnerName)
        this.checkForWinnerOnGameEnd()
        // All the messages should wait for the cards to resolve
        alert(`And The winner is ${this.winner}`)
        manager.replay()
    }
}


class Deck {
    constructor(){
        this.values = {'2' : 2, '3': 3, '4': 4, '5': 5,
         '6': 6, '7': 7, '8': 8, '9': 9, '10':10,
         'ACE':11,'KING':4,'QUEEN':3,'JACK':2 }
         this.deckId = ''
         this.getNewDeck = this.getNewDeck.bind(this)
         this.draw = this.draw.bind(this)
         this.shuffle =this.shuffle.bind(this)
    }

    getNewDeck(){
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
        .then((response) => response.json())
        .then((data) => {
            this.deckId = data.deck_id;
            console.log(this.deckId)
        });
    }
    
    draw(){
        fetch(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
        .then((response) => response.json())
        .then((data) => {
            const cardValue = data.cards[0].value
            const scoreValue = this.values[cardValue]
            console.log('this had been drawn', cardValue)
            console.log('this is score', scoreValue)
            // This should be written in another function in the player class
            for (const person of gameArray[gameIndexCounter].Players){
                if (person.isActive){
                    console.log(person)
                    person.score += scoreValue
                }
            }        
        })
    }

    shuffle(){
        fetch(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/`)
        .then((response) => response.json())
        .then((data) => {console.log(data)})
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
    
    artificialInteligence () {
        console.log('dealer turn runs')
        let playerScore = document.getElementsByTagName('p')
        let scoreToHit = playerScore[3].innerHTML
        if (scoreToHit > 21){
            alert("Dealer is the winner")
            return manager.replay()
        }
        while (this.score < scoreToHit) {
            // Masssive problems with AI--- Draw a card -> update dealer score -> run the checking
            // Separate function for if else!
            newDeck.draw()
            let dealerScore = document.querySelector('.Dealer-score')
            dealerScore.innerHTML = this.score
            if (this.score <= 21 && this.score > scoreToHit){
                alert("Dealer is the winner")
                return manager.replay()
            } else if(scoreToHit === 21 && this.score === 21){
                alert("Its a tie")
                return manager.replay()
            } else if(this.score > 21){
                alert("You are the winner")
                return manager.replay()
            } else if(scoreToHit === this.score){
                alert("Its a tie")
                return manager.replay()
            }
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


class Player extends Dealer {
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


    hitMeHandle() {
        // Draw a card after the deck have been fetched and shuffled 333
        newDeck.draw()
        console.log('this is the new score', this.score)
        let playerScore = document.querySelector(`.${this.name}-score`)
        // Update the score when the card is drawn -444
        playerScore.innerHTML = this.score
        if (this.score > 21) {
            this.isActive = false
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
        // Deal with drawin on the start
        this.hitMeHandle()
        this.hitMeHandle()
        if (this.score == 22){
            this.playerWon = true
        }
        gameArray[gameIndexCounter].checkForWinnerOnStart()
    }

    endTurn(name=this.name) {
        this.isActive = false
        let hitMeButton = document.querySelector(`.${name}-hit-button`)
        let passButton = document.querySelector(`.${name}-fold-button`)
        hitMeButton.removeEventListener('click', this.hitMeHandle)
        passButton.removeEventListener('click', this.passHandle)
        if (gameArray[gameIndexCounter].singlePlayer){
            let  object  = gameArray[gameIndexCounter].playersIterator.next()
            object.value.artificialInteligence()
        } else {
            let  object = gameArray[gameIndexCounter].playersIterator.next()
            !object.done?object.value.startTurn():gameArray[gameIndexCounter].endGame()
        }
    }
}

class Manager{

    initialization() {
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

    newGame() {
        gameArray[gameIndexCounter].startGame()
        gameArray[gameIndexCounter].setupPlayers()
        if (gameArray[gameIndexCounter].singlePlayer){
            gameArray[gameIndexCounter].Players[1].startTurn()
        } else {
            let  object  = gameArray[gameIndexCounter].playersIterator.next()
            object.value.startTurn()
        }
    }

    replay() {
        dealerNode.innerHTML =''
        playersNode.innerHTML =''
        let decision = prompt("Do you want to play a new game?",'yes')
        if (decision || ''){
            manager.initialization()
            return manager.newGame()
        }
        alert("Goodbye")
    }
}


let newDeck = new Deck()
//  get the deck and the procced shuffling 1111
newDeck.getNewDeck()


let gameArray = []
let gameIndexCounter = -1
let manager = new Manager()

manager.initialization()
manager.newGame()





