import { unitToPx } from './metric'

let canvasContext = false,
    mapCanvas = false

function createMapCanvasElement(widthInPx, heightInPx){
    mapCanvas = document.createElement('canvas')
    mapCanvas.width = widthInPx
    mapCanvas.height = heightInPx
    canvasContext = mapCanvas.getContext('2d')

    document.body.appendChild(mapCanvas)
}

function renderPlayersOnMap(players, playerSize){

    if (canvasContext === false){
        throw Error('Canvas not initialized')
    }

    players.forEach(player => {
        canvasContext.beginPath();
        canvasContext.arc(
            unitToPx(player.x), 
            unitToPx(player.y), 
            unitToPx(playerSize), 
            0, 2 * Math.PI, false
        );
        canvasContext.fillStyle = player.color;
        canvasContext.fill();
    });
}

function clear(){
    canvasContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
}

export default {
    createMapCanvasElement,
    renderPlayersOnMap,
    clear
}