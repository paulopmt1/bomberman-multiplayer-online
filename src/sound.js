
function createSound(soundSource) {
    let sound = document.createElement("audio");
    sound.src = soundSource;
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";

    document.body.appendChild(sound);

    return {
        play: function () {
            sound.play();
        },
        stop: function () {
            sound.pause();
        },
        restart: function () {
            sound.currentTime = 0
        }
    }
}


export {
    createSound
}