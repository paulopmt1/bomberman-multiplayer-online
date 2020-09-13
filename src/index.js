import view from './view'
import state from './state'
import { unitToPx } from './metric'
import keyboard from './keyboard'

let currentPlayerIndex = 0

view.createMapCanvasElement(
    unitToPx(state.map.width), unitToPx(state.map.height)
)

function render(){
    view.clear()
    view.renderPlayersOnMap(
        state.players, 
        state.gameAttributes.playerSize
    )

    window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)
render()

keyboard.addKeyListener('ArrowUp', () => {
    state.players[currentPlayerIndex].y -= 1;
})

keyboard.addKeyListener('ArrowDown', () => {
    state.players[currentPlayerIndex].y += 1;
})

keyboard.addKeyListener('ArrowRight', () => {
    state.players[currentPlayerIndex].x += 1;
})

keyboard.addKeyListener('ArrowLeft', () => {
    state.players[currentPlayerIndex].x -= 1;
})

keyboard.startListening()