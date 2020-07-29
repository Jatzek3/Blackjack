
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
            console.log('this runs')
        }else {
        this.Players.map((player)=>
        console.log(player))
        // playersNode.appendChild(player.createPlayer))
        }
    }
    }
    
class Dealer {
    constructor(name){
    this.name = name
    }
    createPlayer(name= this.name) {
        let playerName = document.createElement('div')
        playerName.innerHTML =`${name}`
        playerName.className = `${name}-player`
        let cards = document.createElement('p')
        cards.innerHTML = `${name}'s cards`
        cards.className =` ${name}-cards`
        let score = document.createElement('p')
        score.innerHTML = "00"
        score.className = `${name}-cards`
        playerName.appendChild(cards)
        playerName.appendChild(score)
        return playerName
    }
}


class Player extends Dealer{
    constructor(name){
        super()
        this.name = name;
    }


    
}




let newgame = new Game(['Jacek'])
newgame.startGame()
newgame.setupPlayers()

