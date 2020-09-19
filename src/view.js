import { unitToPx } from './metric.js'

let canvasContext = false,
    mapCanvas = false

function createMapCanvasElement(widthInPx, heightInPx){
    mapCanvas = document.getElementById('canvas-game')

    if (mapCanvas == null){
        mapCanvas = document.createElement('canvas')
    }

    mapCanvas.id = 'canvas-game'
    mapCanvas.width = widthInPx
    mapCanvas.height = heightInPx
    canvasContext = mapCanvas.getContext('2d')

    document.body.appendChild(mapCanvas)
}

function renderPlayersOnMap(players, playerSize){

    if (canvasContext === false){
        throw Error('Canvas not initialized')
    }

    for (const playerId in players) {
        const player = players[playerId]

        canvasContext.beginPath();
        canvasContext.arc(
            unitToPx(player.x), 
            unitToPx(player.y), 
            unitToPx(playerSize), 
            0, 2 * Math.PI, false
        );
        
        canvasContext.fillStyle = player.color;
        canvasContext.fill();
    };
}

function renderBombs(bombs, bombSize){

    for (const bombId in bombs) {
        const bomb = bombs[bombId]

        canvasContext.beginPath();
        canvasContext.arc(
            unitToPx(bomb.x), 
            unitToPx(bomb.y), 
            unitToPx(bombSize), 
            0, 2 * Math.PI, false
        );
        
        canvasContext.globalAlpha = bombsAlpha
        canvasContext.fillStyle = bomb.color;
        canvasContext.fill();
        canvasContext.globalAlpha = 1
    }
}

let bombsAlpha = 0.5
let bombsEffectDirection = 'increase'
setInterval(() => {
    if (bombsEffectDirection == 'increase'){
        bombsAlpha += 0.1
    }else{
        bombsAlpha -= 0.1
    }

    if (bombsAlpha >= 1){
        bombsEffectDirection = 'decrease'
    }

    if (bombsAlpha < 0.5){
        bombsEffectDirection = 'increase'
    }
},100)




function clear(){
    canvasContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
}

export default {
    createMapCanvasElement,
    renderPlayersOnMap,
    renderBombs,
    clear
}