
const listOfFiles = {}

function loadImage(imageKey, imageURL) {
    var newImage = new Image()
    
    newImage.onload = () => {
        listOfFiles[imageKey] = newImage
    }
    
    newImage.src = imageURL
}

function getImage(imageKey) {
    
    if (listOfFiles.hasOwnProperty(imageKey)){
        return listOfFiles[imageKey]
    }
}

export {
    loadImage,
    getImage
}