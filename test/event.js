const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {
  console.log('1번 호출');
});
myEvent.on('event2', () => {
  console.log('2번 호출');
});
myEvent.on('event2', () => {
  console.log('2번 다시 호출');
});
myEvent.on('event2', () => {
  console.log('2번 또 다시 호출');
});
myEvent.once('event3', () => {
  console.log('3번 호출');
});

myEvent.emit('event1');
myEvent.emit('event2');
console.log(myEvent.listenerCount('event2'));

myEvent.emit('event3');
myEvent.emit('event3');

myEvent.on('event4', () => {
  console.log('4번 호출');
});
myEvent.removeAllListeners('event4');
myEvent.emit('event4');

const listener = () => {
  console.log('이벤트 5');
};
myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5');

const listen = function () {
  console.log('이벤트6');
};
myEvent.on('event6', listen);
myEvent.emit('event6');
