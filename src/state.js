
const state = {
    onChangeFunction: [],
    onChange: (fn) => {
        onChangeFunction.push(fn)
    },
    gameAttributes: {
        playerSize: 0.45,
        bombSize: 0.35
    },
    map: {
        width: 25,
        height: 18
    },
    players: {},
    bombs:{}
}

export default state