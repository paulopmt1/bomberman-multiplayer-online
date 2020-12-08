
function Sprite(spriteSheet, x, y, width, height, timePerFrameInMs, numberOfFrames) {
    this.spriteSheet = spriteSheet
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.timePerFrameInMs = timePerFrameInMs
    this.numberOfFrames = numberOfFrames


    this.frameIndex = 0
    this.lastUpdate = Date.now()

    this.update = () => {

        if(Date.now() - this.lastUpdate >= this.timePerFrameInMs) {
            this.frameIndex++;

            if(this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }

            this.lastUpdate = Date.now();
        }
    }


    this.draw = function (context) {
      context.drawImage(
        this.spriteSheet,
        (this.frameIndex * this.width) / this.numberOfFrames,
        0,
        this.width / this.numberOfFrames,
        this.height,
        x,
        y,
        this.width / this.numberOfFrames,
        this.height
      );
    };

}

export {
    Sprite
}