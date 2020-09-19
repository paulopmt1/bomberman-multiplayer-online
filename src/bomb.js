import { CONSTANTS } from './constant.js';
import { generateRandomString } from './random.js';

function buildBomb(position, onExplodeFunction, onEndOfLiveFunction) {

    const bomb = {
        id: generateRandomString(10),
        x: position.x,
        y: position.y,
        fireReachBlocks: CONSTANTS.BOMB_DEFAULT_REACH_BLOCKS,
        state: 'armed',
        color: 'black',
        bombTimer: 0,
        onExplode: onExplodeFunction,
        onEndOfLive: onEndOfLiveFunction
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
        bomb.state = 'exploded'

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

export {
    buildBomb
}