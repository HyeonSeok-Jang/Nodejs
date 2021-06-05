const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userid',
        nicknameField: 'nick',
        passwordField: 'password',
      },
      async (userid, nick, password, done) => {
        try {
          const exUser = await User.findOne({ where: { userid } });
          if (exUser) {
            console.log('test4');
            done(null, false, { message: '이미 가입된 유저입니다.' });
          } else {
            const hash = await bcrypt.hash(password, 12);
            const joinUser = await User.create({
              userid,
              nick,
              password: hash,
            });
            done(null, joinUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
