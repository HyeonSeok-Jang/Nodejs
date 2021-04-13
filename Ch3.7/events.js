const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1',()=>{
    console.log('이벤트1');
});
myEvent.on('event2',()=>{
    console.log('이벤트2');
});
myEvent.on('event'2,()=>{
    console.log('이벤트22');
});
myEvent.once('event3',()=>{
    console.log('이벤트3');
});
myEvent.on('event4',()=>{
    console.log('이벤트4');
});