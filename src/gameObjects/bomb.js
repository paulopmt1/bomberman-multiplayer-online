/**
 * For the tests:
 * - ensure that the bomb explosion event continues to fire as the bomb explodes
 */
import { CONSTANTS } from '../constant.js';
import { generateRandomString } from '../random.js';

function buildBomb(position, onExplode, onEndOfLive) {

    const bomb = {
        id: generateRandomString(10),
        x: position.x,
        y: position.y,
        fireReachBlocks: CONSTANTS.BOMB_DEFAULT_REACH_BLOCKS,
        state: 'armed',
        color: 'black',
        bombTimer: 0,
        onExplode,
        onEndOfLive,
        checkPositionIsOnBombExplosionPath,
    }

    const bombTimerIncrementInMs = 100

    const bombInterval = setInterval(function () {
        bomb.bombTimer += bombTimerIncrementInMs;

        checkBombExploded(bomb)
        
        if (checkBombEndOfLife(bomb)){
            clearInterval(bombInterval)
        }
    }, bombTimerIncrementInMs)

    return bomb
}

function checkBombExploded(bomb) {

    if (bomb.bombTimer > CONSTANTS.BOMB_DEFAULT_TIME_TO_EXPLODE_IN_MS) {

        if (bomb.state == 'armed'){
            bomb.state = 'explosionStarted'
        }else{
            bomb.state = 'exploded'
        }

        if (typeof bomb.onExplode === 'function') {
            bomb.onExplode(bomb);
        }
    }
}

function checkBombEndOfLife(bomb) {
    
    if (bomb.bombTimer > CONSTANTS.BOMB_DEFAULT_TIME_TO_LIVE) {
        
        if (typeof bomb.onEndOfLive === 'function') {
            bomb.onEndOfLive(bomb);
        }

        return true;
    }
}

function checkPositionIsOnBombExplosionPath(position){

    if (position.x >= this.x - this.fireReachBlocks && position.x <= this.x + this.fireReachBlocks && position.y == this.y){
        return true
    }

    if (position.y >= this.y - this.fireReachBlocks && position.y <= this.y + this.fireReachBlocks && position.x == this.x){
        return true
    }

    return false
}

export {
    buildBomb
}