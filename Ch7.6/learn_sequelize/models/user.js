const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  //Sequelize.Model을 상속하는 user 모델 정의
  // exports하여 모듈로 사용
  static init(sequelize) {
    return super.init(
      // static init메서드, 테이블에 대한 설정
      // 첫번째 인수는 테이블 컬럼에 대한 설정
      // MySQL과 일치시켜야 함
      // id는 불필요 알아서 잡아줌
      // init은 초기화
      // sequlize서버와 연결된 객체
      // 연결된 객체를 던져주면
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
          // 테이블 생성 설정 할 때 now()라는 무언가를 사용함
          // 이것을 sequlize에선 이렇게 사용
        },
      },
      {
        sequelize, // DB연결 객체 index.js에서 넘어옴
        // index에서 요청한 DB임
        timestamps: false, // createAt, updatedAt관련 필드
        // true면 createdAt, updateAt 관련필드를 자동 생성
        // created_at을 넣었기 때문에 안함
        underscored: false,
        // true: created_at, updated_at 필드명이 변경됨.
        // 위에 이미 생성이 안되서 솽관없긴 한데...
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        // true: deletedAt필드가 자동 생성됨
        // 삭제를 했지만 다시 복구를 하고싶다고 하면 사용
        // 대부분 이런것을 사용함. 이력 따위로...
        charset: 'utf8', // 이모티콘 사용하려면 utf8mb4로 해야 함
        collate: 'utf8_general_ci', // utf8mb4_general_ci 이것도 이모티콘 쓰려면
      }
    );
  }

  static associate(db) {
    db.User.hasMany(
      // 1. db에서 User테이블에서 N을 대상으로
      db.Comment, // 3. 받는 테이블, belongs되는 테이블에서
      {
        foreignKey: 'commenter', // 4. 이 commenter속성에 들어간다
        sourceKey: 'id', // 2. User 테이블의 SourceKey는 id속성이다
      }
    );
  }
};
