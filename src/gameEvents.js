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
    
    if (eventListeners['*']){
        eventList = typeof eventList == 'object' ? eventList.join(eventListeners['*']) : eventListeners['*']
    }

    if (typeof eventList == 'object'){
        eventList.forEach(functionToCall => {
            functionToCall.call(this, eventName, eventData)
        });
    }
}

export default {
    on,
    publish
}