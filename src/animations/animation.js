
function Animation(spriteSheet, x, y, offsetX, offsetY, width, height, timePerFrameInMs, numberOfFrames) {
    this.spriteSheet = spriteSheet
    this.x = x
    this.y = y
    this.offsetX = offsetX,
    this.offsetY = offsetY,
    this.width = width
    this.height = height
    this.timePerFrameInMs = timePerFrameInMs
    this.numberOfFrames = numberOfFrames
    this.flip = false
    this.flop = false

    this.frameIndex = 0
    this.lastUpdate = Date.now()

    this.stop = () => {
        console.log('stop animation')
    }

    this.play = () => {
        canvasContext.save();

        if(Date.now() - this.lastUpdate >= this.timePerFrameInMs) {
            this.frameIndex++;

            if(this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }

            this.lastUpdate = Date.now();
        }
    };

}

export {
    Animation
}