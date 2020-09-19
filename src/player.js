
function buildPlayer(position, playerId) {
    return {
        id: playerId,
        color: getRandomPlayerColor(),
        x: position.x,
        y: position.y,
        healthPercentage: 100,
        isProtectedFromDeath: false
    }
}

function getRandomPlayerColor() {
    let colors = ['green', 'red', 'blue', 'orange', 'yellow']

    return colors[Math.round(Math.random() * (colors.length - 1))]
}

export {
    buildPlayer
}