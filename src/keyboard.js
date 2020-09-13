const keyListners = {}

function startListening(){
    
    document.addEventListener('keydown', (e) => {

        if (keyListners[e.code]){
            keyListners[e.code]()
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