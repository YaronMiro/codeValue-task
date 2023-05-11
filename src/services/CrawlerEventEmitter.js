
const EventEmitter = require('events');
module.exports ={
    crawlerEventEmitter: new EventEmitter(),
    eventsTypes: {
        crawlerProcessEnded: 'crawler:end'
    }
}