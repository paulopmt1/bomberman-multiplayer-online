import { Sprite } from './gameObjects/sprite.js'
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

async function renderPlayersOnMap(players, playerSize){

    if (canvasContext === false){
        throw Error('Canvas not initialized')
    }

    for (const playerId in players) {
        const player = players[playerId]

        if (! player.visualObject) {
            let playerObject = await newPlayer(player.x, player.y)
            player.visualObject = playerObject
        }

        player.visualObject.flip = false
        
        if (player.moveDirection == 'ArrowLeft') {
            player.visualObject.flip = true
        }
        
        player.visualObject.y = player.y
        player.visualObject.x = player.x
        player.visualObject.play(canvasContext)
    };
}

function newPlayer(x, y) {
  var player;
  var playerSpritesheet = new Image();
  playerSpritesheet.src = "assets/sprites/bomberman-walking-front.png";

  return new Promise((resolve, reject) => {
    playerSpritesheet.onload = () => {
      player = new Sprite(
        playerSpritesheet,
        x,
        y,
        112, //total width of spritesheet image in pixels
        46, //total height of spritesheet image in pixels
        300, //time(in ms) duration between each frame change (experiment with it to get faster or slower animation)
        4
      );

      resolve(player);
    };
  });
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

        if (bomb.state == 'exploded'){
            renderBombExplosionFires(bomb, bombSize)
        }
    }
}

function renderBombExplosionFires(bomb, bombSize){
    
    for (let i = -bomb.fireReachBlocks; i <= bomb.fireReachBlocks; i++){
        renderBombExplosionCircle(bomb.x -i, bomb.y, bombSize)
    }

    for (let i = -bomb.fireReachBlocks; i <= bomb.fireReachBlocks; i++){
        renderBombExplosionCircle(bomb.x, bomb.y - i, bombSize)
    }
}

function renderBombExplosionCircle(x, y, bombSize){
    canvasContext.beginPath();
    canvasContext.arc(
        unitToPx(x), 
        unitToPx(y), 
        unitToPx(bombSize), 
        0, 2 * Math.PI, false
    );
    
    canvasContext.globalAlpha = 1
    canvasContext.fillStyle = 'red';
    canvasContext.fill();
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