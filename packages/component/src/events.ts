function createEvent(name: string) {
    let e
    if (typeof Event === 'function') {
        e = new Event(name)
    } else {
        e = document.createEvent('Event')
        e.initEvent(name, true, true)
    }
    return {
        [name]: e
    }
}

export function dispatch(name: string) {
    document.dispatchEvent(privateEvents[name])
}

export enum Events {
    ready = '@blynx/component:ready',
    init = '@blynx/component:init'
}

const privateEvents: {[key: string]: Event} = {
    ...createEvent(Events.ready),
    ...createEvent(Events.init)
}