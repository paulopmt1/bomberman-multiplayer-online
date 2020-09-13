import { CONSTANTS } from './constant'

function unitToPx(unit){
    return unit * CONSTANTS.UNIT_TO_PX_SCALE
}

export {
    unitToPx
}