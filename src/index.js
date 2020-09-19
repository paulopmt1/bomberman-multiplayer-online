import view from './view.js'
import io from 'socket.io-client';
import { unitToPx } from './metric.js'
import keyboard from './keyboard.js'

let gameState = {}

function render(){
    view.clear()
    view.renderPlayersOnMap(
        gameState.players, 
        gameState.gameAttributes.playerSize
    )

    window.requestAnimationFrame(render)
}

function startGame(data){
    gameState = data
    
    view.createMapCanvasElement(unitToPx(gameState.map.width), unitToPx(gameState.map.height))
    render()
}


var socket = io('http://localhost:9000');
socket.on('connect', function(){
    console.log('connected on server') 
});

socket.on('event', function(data){
    console.log('event: ', data)
});
socket.on('disconnect', function(data){
    console.log('disconnect: ', data)
});

socket.on('get-start-map', (data) => {
    startGame(data)
})

socket.on('update-game-state', (data) => {
    gameState = data
})


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

keyboard.startListening()