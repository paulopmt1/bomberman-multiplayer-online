const eventListeners = []

function on(eventName, callbackFunction){
    let eventList = eventListeners[eventName]

    if (typeof eventList == 'object'){
        eventList.push(callbackFunction)
    }else{
        eventListeners[eventName] = [callbackFunction]
    }
}

function publish(eventName, eventData){
    let eventList = eventListeners[eventName]

    if (typeof eventList == 'object'){
        eventList.forEach(element => {
            element.call(this, eventData)
        });
    }
}

export default {
    on,
    publish
}