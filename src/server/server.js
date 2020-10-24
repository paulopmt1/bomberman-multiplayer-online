import express from 'express'
import http from 'http'
import socketio from 'socket.io'

import state from './state.js'
import game from './game.js'
import gameEvents from '../gameEvents.js'
import { Console } from 'console'

const activeConnections = []
const app = express()
const server = http.createServer(app)
const socket = socketio(server)

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
});

socket.on('connection', (socket) => {
    activeConnections.push(socket)
    console.log('nova conexao: ', socket.id)
    game.addPlayer(socket.id)
    socket.emit('get-start-map', state)
    printGameState()

    socket.on('user-move', (movement) => {
        game.movePlayer(socket.id, movement)
    })

    socket.on('user-planted-bomb', () => {
        const player = state.players[socket.id]
        game.addBomb({ x: player.x, y: player.y }, player.id)
    })

    socket.on('disconnect', (reason) => {
        console.log('user disconnected: ', socket.id)
        game.deletePlayer(socket.id)
    })
})

gameEvents.on('*', (eventName, data) => {
    activeConnections.forEach((socket) => {
        socket.emit(eventName, data)
    })
})

// state.onChange(() => {
setInterval(function () {
    notifyGameStateChangeForAllUsers()
    // printGameState()
}, 100)
// })

function printGameState() {
    console.log('actual game state: ', state)
}

function notifyGameStateChangeForAllUsers() {
    activeConnections.forEach((socket) => {
        socket.emit('update-game-state', state)
    })
}

server.listen(9000, () => {
    console.log('listening on *:9000');
})