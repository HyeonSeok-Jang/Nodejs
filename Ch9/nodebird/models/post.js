const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.STRING(140),
          // 트위터 처럼 140자
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Post',
        tableName: 'posts',
        paranoid: false, // deletedAt 필드 안생김
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User); // 게시글은 유저 하나만 각기 자기 글을 작성하기 떄문에..
    // N:1
    // post.getUser(), poast.addUser()등 사용 가능
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    // 게시글과 해시태그의 관계 = N:M관계 328페이지, 그림7-59참고
    // postId, hashtagId가 외래키
    // post.getHashtags(), post.addHashtags(), hashtag.getPosts
  }
};
