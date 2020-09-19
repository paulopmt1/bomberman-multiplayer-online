import { CONSTANTS } from './constant.js';
import state from './state.js';
import { generateRandomString } from './random.js';

function addBomb(position, playerId){
    const that = this
    const bombId = generateRandomString(10)

    state.bombs[bombId] = {
        x: position.x,
        y: position.y,
        fireReachBlocks: CONSTANTS.BOMB_DEFAULT_REACH_BLOCKS,
        state: 'armed',
        color: 'black',
        playerId: playerId,
        bombTimer: 0,
        id: bombId
    }
}

function removeBomb(bombId){
    delete state.bombs[bombId]
}

setInterval(function(){

    for (const bombId in state.bombs) {
        const bomb = state.bombs[bombId]
        bomb.bombTimer += 100;

        if (bomb.bombTimer > CONSTANTS.BOMB_DEFAULT_TIME_TO_EXPLODE_IN_MS){
            bomb.state = 'exploded'
            bomb.color = 'red'
        }

        if (bomb.bombTimer > CONSTANTS.BOMB_DEFAULT_TIME_TO_LIVE){
            removeBomb(bomb.id)
        }
    }
}, 100)


export {
    addBomb
}