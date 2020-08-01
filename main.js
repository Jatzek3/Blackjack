let dealerNode = document.querySelector('.dealer-button')
let playersNode = document.querySelector('.players')
let shuffleReady;
let turnStarted;



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
        shuffleReady = deckReady.then(()=>{newDeck.shuffle()})
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
        if (playersLeft.length === 1){
            this.winner = playersLeft[0].name
            playersLeft[0].playerWon = true
            this.endGame()

        } else if (this.singlePlayer){
            if (this.Players[0].playerWon){
                this.winner = this.Players[0].name
                this.endGame()}
         } else {
            const winningPlayer = this.Players.filter((player)=> player.playerWon)
            if (winningPlayer.length > 0){
                this.winner = winningPlayer[0].name
                this.endGame()
            } 
        }

    }
        

    checkForWinnerOnGameEnd() {     //  Serious Debug needed

        let playersLeft = this.Players.filter(player => player.score< 22)
        let winnerName='';
        //  Compare this with AI
        if (this.singlePlayer){
           this.Players[0].score > this.Players[1]?
           this.winner = this.Players[0].name:
           this.winner = this.Players[1].name

        } else {
            let maxScore = 0;
            if (playersLeft.length)
            for (let i = 0; i < this.Players.length; i += 1){
                if (this.Players[i].score === maxScore){
                    this.tie = true
                } else if (this.Players[i].score > maxScore 
                    && this.Players[i].score < 22) {
                    maxScore = this.Players[i].score
                    winnerName = this.Players[i].name
                    this.tie = false
                }
            }
        }
        this.tie?this.winner ="It's a tie":this.winner = winnerName
    }

    endGame(){
        console.log(this.winnerName)
        this.checkForWinnerOnGameEnd()
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
         this.shuffle =this.shuffle.bind(this)
    }

    getNewDeck = () => new Promise((resolve, reject) =>{
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
        .then((response) => response.json())
        .then((data) => {
            this.deckId = data.deck_id;
            console.log('New deck festched',this.deckId)
            resolve()
        });
    } ) 
    
    shuffle(){
        fetch(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/`)
        .then((response) => response.json())
        .then((data) => {console.log('New deck shuffled',data)})
    }
}
    

class Dealer {
    constructor(name){
    this.name = name
    this.isActive = false
    this.score = 0
    this.playerLost = false
    this.playerWon = false
    this.scoreToHit = 0
    this.chechIfDealerWon = this.chechIfDealerWon.bind(this)
    }
    
    artificialInteligence () {
        // The last card In AI must be visible, as well as players over 22
        // Add dom maniplation to display cards
        let playerScore = document.getElementsByTagName('p')
        this.scoreToHit = playerScore[3].innerHTML
        if (this.scoreToHit > 21){
            alert("Dealer is the winner")
            return manager.replay()
        }
        this.dealerDraws()
        }


    dealerDraws(){
        let dealerScore = document.querySelector('.Dealer-score')
        if (this.score < this.scoreToHit){
        fetch(`https://deckofcardsapi.com/api/deck/${newDeck.deckId}/draw/?count=1`)
        .then((response) => response.json())
        .then((data) => {
            const cardValue = data.cards[0].value
            const scoreValue = newDeck.values[cardValue]
            this.score += scoreValue})
        .then(()=> {dealerScore.innerHTML = this.score})
        .then(()=>{this.chechIfDealerWon()})
        .then(()=>{this.dealerDraws()})
        }
    }


    chechIfDealerWon(){
        console.log('this runs')
        if (this.score <= 21 && this.score > this.scoreToHit){
            console.log('scenario1 runs')
            alert("Dealer is the winner")
            return manager.replay()
        } else if(this.scoreToHit === 21 && this.score === 21){
            console.log('scenario2 runs')
            alert("Its a tie")
            return manager.replay()
        } else if(this.score > 21) {
            alert("You are the winner")
            return manager.replay() 
        } else if (this.scoreToHit === this.score){
            alert("Its a tie")
            return manager.replay()
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
        // The last card In AI must be visible, as well as players over 22
        // Add dom maniplation to display cards
        let playerScore = document.querySelector(`.${this.name}-score`)

        fetch(`https://deckofcardsapi.com/api/deck/${newDeck.deckId}/draw/?count=1`)
        .then((response) => response.json())
        .then((data) => {
            const cardValue = data.cards[0].value
            const scoreValue = newDeck.values[cardValue]
            this.score += scoreValue})
        .then(()=> {playerScore.innerHTML = this.score})
        .then(()=>{        
            if (this.score > 21) {
            this.isActive = false
            this.endTurn()
        }})

    }

    passHandle(){
        this.endTurn()
    }

    startTurn(name = this.name) {
        this.isActive = true 

        let playerScore = document.querySelector(`.${name}-score`)
        let hitMeButton = document.querySelector(`.${name}-hit-button`)
        let passButton = document.querySelector(`.${name}-fold-button`)

        hitMeButton.addEventListener('click',this.hitMeHandle)
        passButton.addEventListener('click',this.passHandle )

        turnStarted = shuffleReady
        .then(()=>{this.hitMeHandle()})
        .then(()=>{this.hitMeHandle()})
        .then(()=>{this.score == 22?this.playerWon = true:null})
        .then(()=>{manager.gameArray[manager.gameIndexCounter].checkForWinnerOnStart()})
        .then(()=> {playerScore.innerHTML = this.score})
    }

    endTurn(name=this.name) {
        this.isActive = false

        let hitMeButton = document.querySelector(`.${name}-hit-button`)
        let passButton = document.querySelector(`.${name}-fold-button`)

        hitMeButton.removeEventListener('click', this.hitMeHandle)
        passButton.removeEventListener('click', this.passHandle)


        if (manager.gameArray[manager.gameIndexCounter].singlePlayer){
            let  object  = manager.gameArray[manager.gameIndexCounter].playersIterator.next()
            object.value.artificialInteligence()
        } else {
            let  object = manager.gameArray[manager.gameIndexCounter].playersIterator.next()
            !object.done?object.value.startTurn():manager.gameArray[manager.gameIndexCounter].endGame()
        }
    }
}

class Manager{
    constructor(){
        this.gameArray = []
        this.gameIndexCounter = -1
    }

    initialization() {
            let playerNames = []
            this.gameIndexCounter += 1
            let hero = prompt('What is Your Name', 'Hero')
            // here is a bug - name must be starting with a letter becouse of Classnaming
            playerNames.push(hero)
            let singleOrMulti = prompt('Do you want to play alone, or with others(enter number)', 'yes')
            if (singleOrMulti.toLowerCase == 'yes'){
                this.gameArray.push(new Game(playerNames))
            } else {
                for (let i = 0; i < +singleOrMulti; i++ ){
                    playerNames.push(`Player${i+1}`)
                }
                this.gameArray.push(new Game(playerNames))
            }
        }

    newGame() {
        this.gameArray[this.gameIndexCounter].startGame()
        this.gameArray[this.gameIndexCounter].setupPlayers()
        if (this.gameArray[this.gameIndexCounter].singlePlayer){
            this.gameArray[this.gameIndexCounter].Players[1].startTurn()
        } else {
            let  object  = this.gameArray[this.gameIndexCounter].playersIterator.next()
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


let manager = new Manager()
let newDeck = new Deck()

const deckReady = newDeck.getNewDeck()
.then(()=> {newDeck.shuffle()})
.then(()=> {manager.initialization()})
.then(()=> {manager.newGame()})


