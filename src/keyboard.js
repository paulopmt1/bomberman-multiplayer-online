const keyListners = {}

function startListening(){
    
    document.addEventListener('keydown', (e) => {

        if (keyListners[e.code]){
            console.log('event')
            keyListners[e.code]()
        }
    })

    document.addEventListener('keyup', () => {
        if (keyListners['releaseKeys']) {
            keyListners['releaseKeys']()
        }
    })
}

function addKeyListener(keyCode, fn){
    keyListners[keyCode] = fn
}

export default {
    startListening,
    addKeyListener
}