import view from './view.js'
import io from 'socket.io-client';
import { unitToPx } from './metric.js'
import keyboard from './keyboard.js'
import { createSound } from './sound.js'

let gameState = {}

function renderCene() {
    view.clear()
    view.renderPlayersOnMap(
        gameState.players,
        gameState.gameAttributes.playerSize
    )
    view.renderBombs(
        gameState.bombs,
        gameState.gameAttributes.bombSize
    )

    window.requestAnimationFrame(renderCene)
}

function startGameWithServerData(data) {
    gameState = data

    view.createMapCanvasElement(unitToPx(gameState.map.width), unitToPx(gameState.map.height))
    renderCene()

    let scenarioSound = createSound('/assets/music/ExtremeChaos.mp3')
    scenarioSound.play()
}

var socket;
function initGame() {
    socket = io('http://localhost:9000')
    socket.on('connect', function () {
        console.log('connected on server')
    });

    socket.on('event', function (data) {
        console.log('event: ', data)
    });
    socket.on('disconnect', function (data) {
        console.log('disconnect: ', data)
    });

    socket.on('get-start-map', (data) => {
        startGameWithServerData(data)
    })

    socket.on('bomb-exploded', () => {
        let bomb = createSound('/assets/music/Bomb.mp3')
        bomb.play()
    })

    socket.on('update-game-state', (data) => {
        gameState = data
    })

    document.removeEventListener('click', initGame)
}
document.addEventListener('click', initGame)



keyboard.addKeyListener('ArrowUp', () => {
    socket.emit('user-move', 'ArrowUp')
})

keyboard.addKeyListener('ArrowDown', () => {
    socket.emit('user-move', 'ArrowDown')
})

keyboard.addKeyListener('ArrowRight', () => {
    socket.emit('user-move', 'ArrowRight')
})

keyboard.addKeyListener('ArrowLeft', () => {
    socket.emit('user-move', 'ArrowLeft')
})

keyboard.addKeyListener('Space', () => {
    socket.emit('user-planted-bomb')
})

keyboard.startListening()