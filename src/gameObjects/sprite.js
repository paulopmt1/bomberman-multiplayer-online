import { unitToPx } from "../metric"

function Sprite(spriteSheet, x, y, width, height, timePerFrameInMs, numberOfFrames) {
    this.spriteSheet = spriteSheet
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.timePerFrameInMs = timePerFrameInMs
    this.numberOfFrames = numberOfFrames
    this.flip = false
    this.flop = false

    this.frameIndex = 0
    this.lastUpdate = Date.now()

    this.play = (canvasContext) => {
        canvasContext.save();

        if(Date.now() - this.lastUpdate >= this.timePerFrameInMs) {
            this.frameIndex++;

            if(this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }

            this.lastUpdate = Date.now();
        }

        let flipScale, flopScale = 1;
    
        canvasContext.save()
        
        if(this.flip) {
            flipScale = -1; 
            canvasContext.translate(this.width / this.numberOfFrames, 0);
        } else {
            flipScale = 1;
        }
        
        if(this.flop) {
            flopScale = -1; 
            canvasContext.translate(0, this.width / this.numberOfFrames);
        } else {
            flopScale = 1;
        }

        canvasContext.scale(flipScale, flopScale);

        canvasContext.drawImage(
            this.spriteSheet,
            (this.frameIndex * this.width) / this.numberOfFrames,
            0,
            this.width / this.numberOfFrames,
            this.height,
            unitToPx(this.x) * flipScale,
            unitToPx(this.y) * flopScale,
            this.width / this.numberOfFrames,
            this.height
        );

        canvasContext.restore();
    };

}

export {
    Sprite
}