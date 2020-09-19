import state from "./state.js";

function movePlayer(playerId, direction) {
    let player = state.players[playerId]

    if (!player) {
        return
    }

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
}

function getRandomPlayerColor() {
    let colors = ['green', 'red', 'blue', 'orange', 'yellow']

    return colors[Math.round(Math.random() * (colors.length - 1))]
}

export {
    addPlayer,
    deletePlayer,
    movePlayer
}