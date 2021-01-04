import { Sprite } from './gameObjects/sprite.js'
import { Animation } from './animations/animation.js'
import { getImage } from './loader/fileManager.js'
import { unitToPx } from './metric.js'

window.canvasContext = false
window.mapCanvas = false

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

        if (! player.sprite) {
            const animationWalk = new Animation(
                getImage('player1'),
                player.x,
                player.y,
                0, // offset x on spritesheet
                57, // offset y on spritesheet
                528, //total width of spritesheet image in pixels
                57, //total height of spritesheet image in pixels
                120, //time(in ms) duration between each frame change (experiment with it to get faster or slower animation)
                8
            );

            const animationIdle = new Animation(
                getImage('player1'),
                player.x,
                player.y,
                0, // offset x on spritesheet
                0, // offset y on spritesheet
                264, //total width of spritesheet image in pixels
                57, //total height of spritesheet image in pixels
                200, //time(in ms) duration between each frame change (experiment with it to get faster or slower animation)
                4
            );

            const animationWalkDown = new Animation(
                getImage('player1'),
                player.x,
                player.y,
                0, // offset x on spritesheet
                116, // offset y on spritesheet
                528, //total width of spritesheet image in pixels
                57, //total height of spritesheet image in pixels
                120, //time(in ms) duration between each frame change (experiment with it to get faster or slower animation)
                8
            );


            const animationWalkUp = new Animation(
                getImage('player1'),
                player.x,
                player.y,
                0, // offset x on spritesheet
                173, // offset y on spritesheet
                528, //total width of spritesheet image in pixels
                57, //total height of spritesheet image in pixels
                120, //time(in ms) duration between each frame change (experiment with it to get faster or slower animation)
                8
            );
            
            player.sprite = new Sprite(player.x, player.y)
            player.sprite.addAnimation('player-walk-right', animationWalk)
            player.sprite.addAnimation('player-idle', animationIdle)
            player.sprite.addAnimation('player-walk-down', animationWalkDown)
            player.sprite.addAnimation('player-walk-up', animationWalkUp)
            
            player.moveDirection = 'stopped'
            player.sprite.play('player-idle')
        }

        player.sprite.actualAnimation.flip = false

        
        if (player.moveDirection == 'ArrowLeft' || player.moveDirection == 'ArrowRight') {
            player.sprite.play('player-walk-right')
        }

        if (player.moveDirection == 'ArrowLeft') {
            player.sprite.actualAnimation.flip = true
        }

        if (player.moveDirection == 'ArrowDown') {
            player.sprite.play('player-walk-down')
        }

        if (player.moveDirection == 'ArrowUp') {
            player.sprite.play('player-walk-up')
        }

        if (player.moveDirection == 'stopped'){
            player.sprite.play('player-idle')
        }
        
        player.sprite.y = player.y
        player.sprite.x = player.x
        player.sprite.updateAnimation()
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