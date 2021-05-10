const express = require('express');
const path = require('path');

const app = express();

let users = [
  {
    id: 1,
    name: 'alice',
  },
  {
    id: 2,
    name: 'bek',
  },
  {
    id: 3,
    name: 'chars',
  },
];

app.set('port', process.env.PORT || 3000);

// app.get('/', (req, res) => {
//   res.send('<h1>test</h1>');
// });

app.get('/', (req, res) => {
  console.log('get');

  res.json(users);
});

app.post('/post', (req, res) => {
  console.log('post');
  var inputData;

  req
    .on('data', (data) => {
      inputData = JSON.parse(data);
    })
    .on('end', () => {
      console.log('user_id: ' + inputData.users_id + ', name: ' + inputData.name);
    });
  res.write('ok');
  res.end();
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 대기');
});
