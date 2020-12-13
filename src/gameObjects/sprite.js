import { unitToPx } from "../metric";

function Sprite(x, y) {
    this.animations = {}
    this.actualAnimation = {}
    this.x = x
    this.y = y

    this.addAnimation = (animationKey, animation) => {
        this.animations[animationKey] = animation
    }

    this.updateAnimation = () => {
        canvasContext.save()
        
        let flipScale, flopScale = 1;

        if(this.actualAnimation.flip) {
            flipScale = -1; 
            canvasContext.translate(this.actualAnimation.width / this.actualAnimation.numberOfFrames, 0);
        } else {
            flipScale = 1;
        }
        
        if(this.actualAnimation.flop) {
            flopScale = -1; 
            canvasContext.translate(0, this.actualAnimation.width / this.actualAnimation.numberOfFrames);
        } else {
            flopScale = 1;
        }

        canvasContext.scale(flipScale, flopScale);

        canvasContext.drawImage(
            this.actualAnimation.spriteSheet,
            this.actualAnimation.offsetX + (this.actualAnimation.frameIndex * this.actualAnimation.width) / this.actualAnimation.numberOfFrames,
            this.actualAnimation.offsetY,
            this.actualAnimation.width / this.actualAnimation.numberOfFrames,
            this.actualAnimation.height,
            unitToPx(this.x - 1) * flipScale,
            unitToPx(this.y - 1) * flopScale,
            this.actualAnimation.width / this.actualAnimation.numberOfFrames,
            this.actualAnimation.height
        );

        canvasContext.restore();
    }

    this.play = function(animationKey) {

        if (this.animations.hasOwnProperty(animationKey)) {
            this.stop()
            this.actualAnimation = this.animations[animationKey]
            this.actualAnimation.play()
        }
    }

    this.stop = function() {
        if (this.actualAnimation.hasOwnProperty('stop')) {
            this.actualAnimation.stop()
        }
    }


    return this
}

export { Sprite };
