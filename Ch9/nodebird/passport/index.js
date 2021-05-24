const passport = require('passport');
const local = require('./localStrategy'); // 로컬 로그인 전략
const kakao = require('./kakaoStrategy'); // 카카오 로그인 전략
const User = require('../models/user'); // User모델을 사용하기 위해

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 직렬화 사용자, 로그인시 실행
    // req.session객채에 어떤 데이터를 저장할 지 설정
    done(null, user.id);
    // 이렇게 하면 req.session객체에 user값이 저장
    // 관례상 이렇게 많이 함, 다른것도 넣어도 되지만...
  });
  passport.deserializeUser((id, done) => {
    // 정보가 저장되었을 때 매번 request에 대해 실행되는 메소드
    // passport.session()에서 호출하는 메소드
    // deserializeUser(1번인자, 2번인자)
    // 1번인자 - serializeUser()의 done()의 2번째인자값이 됨
    // 호출되도록 관례상 이렇게 되어있음

    User.findOne({ where: { id } }) // table에 이 user의 id가 있는지 확인하기
      .then((user) => done(null, user))
      // 뭔가 작업이 끝나면 실행하는 내부 함수가 있다
      .catch((err) => done(err));
    // User모델에서 id로 저장된 row를 찾아서 user객체로 전달
    // 전달 할 때 콜백함수 done()호출, user객체를 req.user에 객체를 저장(req.user=user)
  });
  local();
  kakao();
};
