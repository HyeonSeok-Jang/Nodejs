const mongoose = require('mongoose');

function findAndSaveUser(Users) {
  Users.findOne({}, (err, user) => {
    // 첫 번째 콜백
    if (err) {
      return console.error(err);
    }
    user.name = 'zero';
    user.save((err) => {
      // 두 번째 콜백
      console.log(user);
      if (err) {
        return console.error(err);
      }
      Users.findOne({ gender: 'm' }, (err, user) => {
        // 세 번째 콜백
        // 생략
      });
    });
  });
}

const { Schema } = mongoose;
const Users = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

findAndSaveUser(Users);
