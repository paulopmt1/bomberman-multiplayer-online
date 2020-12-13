import state from './state.js'
import { buildBomb } from '../gameObjects/bomb.js'
import { buildPlayer } from '../gameObjects/player.js'
import { CONSTANTS } from '../constant.js'
import gameEvents from '../gameEvents.js'

function deletePlayer(playerId) {
    delete state.players[playerId]
}

function stopPlayer(playerId) {
    let player = state.players[playerId]

    if (! player){
        return 
    }

    player.moveDirection = 'stopped'
}

function addPlayer(playerId) {
    state.players[playerId] = buildPlayer({ x: 1, y: 2 }, playerId)
}

function movePlayer(playerId, direction) {
    let player = state.players[playerId]

    if (! player){
        return 
    }

    player.moveDirection = direction

    switch (direction) {
        case 'ArrowDown':
            if (player.y < state.map.height - 1) {
                player.y += 0.4;
            }
            break;
        case 'ArrowUp':
            if (player.y > 1) {
                player.y -= 0.4;
            }
            break;
        case 'ArrowRight':
            if (player.x < state.map.width - 1) {
                player.x += 0.4;
            }
            break;
        case 'ArrowLeft':
            if (player.x > 1) {
                player.x -= 0.4;
            }
            break;
    }
}

function checkPlayersHitByBomb(bomb){

    for (const playerId in state.players) {
        const player = state.players[playerId]

        if (bomb.checkPositionIsOnBombExplosionPath({ x: player.x, y: player.y }) && player.isProtectedFromDeath == false){
            player.color = 'purple'
            player.healthPercentage -= CONSTANTS.BOMB_DAMAGE_PERCENT_ON_PLAYER
            player.isProtectedFromDeath = true
            
            setTimeout(function(){
                player.isProtectedFromDeath = false
            },2000)

            if (player.healthPercentage <= 0){
                deletePlayer(playerId)
            }
        }
    }
}


function removeBomb(bombId) {
    delete state.bombs[bombId]
}

function onExplodeBomb(bomb) {
    bomb.color = 'red'
    checkPlayersHitByBomb(bomb)
    
    if (bomb.state == 'explosionStarted'){
        gameEvents.publish('bomb-exploded')
    }
}

function onBombEndOfLife(bomb) {
    removeBomb(bomb.id)
}

function addBomb(position) {
    let bomb = buildBomb(position, onExplodeBomb, onBombEndOfLife)
    state.bombs[bomb.id] = bomb

    return bomb
}

export default {
    addPlayer,
    deletePlayer,
    movePlayer,
    addBomb,
    stopPlayer
}