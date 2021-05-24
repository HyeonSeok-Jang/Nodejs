const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      // 컬럼생성 하는 부분
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          // local또는 sns로그인 서비스 제공자
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: 'local',
        },
        snsId: {
          // SNS 로그인 서비스 이용지 SNS ID 저장
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize, // createAt UpdateAt 컬럼도 생성
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    // 팔로워:팔로잉관계
    db.User.hasMany(db.Post); // 다른 모델 table과 관계설정
    // 1대 다의 관계
    // user.getPosts(), uer.appPosts
    db.User.belongsToMany(db.User, {
      // user.addPosts() 메소드 자동사용 가능
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow', // db.sequelize.models.Fllow라 모델 사용 가능
    });
    db.User.belongsToMany(db.User, {
      // userID를 외래키 참조
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};
