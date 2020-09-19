import state from './state.js'
import { buildBomb } from './bomb.js'
import { buildPlayer } from './player.js'

function deletePlayer(playerId) {
    delete state.players[playerId]
}

function addPlayer(playerId) {
    state.players[playerId] = buildPlayer({ x: 1, y: 2 }, playerId)
}

function movePlayer(playerId, direction) {
    let player = state.players[playerId]

    switch (direction) {
        case 'ArrowDown':
            if (player.y < state.map.height - 1) {
                player.y += 1;
            }
            break;
        case 'ArrowUp':
            if (player.y > 1) {
                player.y -= 1;
            }
            break;
        case 'ArrowRight':
            if (player.x < state.map.width - 1) {
                player.x += 1;
            }
            break;
        case 'ArrowLeft':
            if (player.x > 1) {
                player.x -= 1;
            }
            break;
    }
}



function removeBomb(bombId) {
    delete state.bombs[bombId]
}

function onExplodeBomb(bomb) {
    bomb.color = 'red'
}

function onBombEndOfLife(bomb) {
    removeBomb(bomb.id)
}

function addBomb(position) {
    let bomb = buildBomb(position, onExplodeBomb, onBombEndOfLife)
    state.bombs[bomb.id] = bomb
}

export default {
    addPlayer,
    deletePlayer,
    movePlayer,
    addBomb
}