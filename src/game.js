import state from './state.js'

function movePlayer(playerId, direction){
    let player = state.players[playerId]
        
    if (! player){
        return
    }

    switch (direction){
        case 'ArrowDown':
            player.y += 1;
            break;
        case 'ArrowUp':
            player.y -= 1;
            break;
        case 'ArrowRight':
            player.x += 1;
            break;
        case 'ArrowLeft':
            player.x -= 1;
            break;
    }

    printGameState()
}

function deletePlayer(playerId) {
    delete state.players[playerId]
}

function addPlayer(playerId) {

    state.players[playerId] = {
        id: playerId,
        color: getRandomPlayerColor(),
        x: 1,
        y: 1
    }

    printGameState()
}

function getRandomPlayerColor() {
    let colors = ['green', 'red', 'blue', 'orange', 'yellow']

    return colors[Math.round(Math.random() * (colors.length - 1))]
}

function printGameState() {
    console.log('actual game state: ', state)
}


export default {
    addPlayer,
    deletePlayer,
    movePlayer,
    printGameState
}