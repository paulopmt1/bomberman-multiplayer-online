const keyListners = {}

const keys = {}

function startListening(){
    
    document.addEventListener('keydown', (e) => {
        keys[e.code] = true
    })

    document.addEventListener('keyup', (e) => {
        
        delete keys[e.code];

        if (keyListners['releaseKeys']) {
            keyListners['releaseKeys']()
        }
    })

    setInterval(() => {

        for (var direction in keys) {
            if (!keys.hasOwnProperty(direction)) continue;
            
            if (keyListners[direction]){
                keyListners[direction]()
            }
        }
        
    }, 1)
}

function addKeyListener(keyCode, fn){
    keyListners[keyCode] = fn
}

export default {
    startListening,
    addKeyListener
}