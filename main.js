
let dealerNode = document.querySelector('.dealer-button')
let playersNode = document.querySelector('.players')


class Game {
    constructor(playerNames){
        this.playerNames = playerNames
        this.Players =[]
        this.singlePlayer = true
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
            console.log(this.Players)
            dealerNode.appendChild(this.Players[0].createPlayer())
            playersNode.appendChild(this.Players[1].createPlayer())
        }else {
        this.Players.map((player)=>
        playersNode.appendChild(player.createPlayer()))
        }
    }
    }
    
class Dealer {
    constructor(name){
    this.name = name
    this.isActive = false
    this.score = 0
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
        score.className = `${name}-cards`
        playerName.appendChild(cards)
        playerName.appendChild(score)
            if (this instanceof Player) {
            let hitButton = document.createElement("BUTTON")
            hitButton.innerHTML = 'Hit Me!'
            hitButton.className = `${name}-hit-button`
            let passButton = document.createElement("BUTTON")
            passButton.innerHTML = "Fold"
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
        this.isActive = false
        this.score = 0
        this.passHandle = this.passHandle.bind(this)
    }


    hitMeHandle(){
        console.log('click handled')
    }
    passHandle(){
        console.log('click handled')
        console.log(this)
        this.endTurn()
        this.isActive = false

    }


    startTurn(name = this.name) {
        console.log('turn started')
        let hitMeButton = document.querySelector(`.${name}-hit-button`)
        let passButton = document.querySelector(`.${name}-fold-button`)

        hitMeButton.addEventListener('click', this.hitMeHandle)
        passButton.addEventListener('click', this.passHandle)
        this.hitMeHandle()
        this.hitMeHandle()
    }

    endTurn(name=this.name){
        console.log('turn ended')
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
newgame.Players[1].startTurn()
