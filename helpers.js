const createPlayer = (name) => {
    let playerName = document.createElement('div')
    playerName.innerHTML(`${name}`)
    playerName.className = `${name}-player`
    let cards = document.createElement('p')
    cards.innerHTML(`${name}'s cards`)
    cards.className =` ${name}-cards`
    let score = document.createElement('p')
    score.innerHTML("00")
    score.className = `${name}-cards`
    playerName.appendChild(cards)
    playerName.appendChild(score)
    return playerName

}
