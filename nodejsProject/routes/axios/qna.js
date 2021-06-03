const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const Sequelize = require('sequelize');
const { Post, User, Comment } = require('../../models');
const db = require('../../models/index');
const Op = Sequelize.Op;
const router = express.Router();

router.get('/qna', isLoggedIn, async (req, res) => {
  try {
    let page = 0;
    // try {
    //   page = req.query.page;
    // } catch (err) {
    //   page = 0;
    // }
    const result = await Post.findAll({
      attributes: ['id', 'title', 'content', 'createdAt'],
      order: [['createdAt', 'DESC']],
      offset: page * 5,
      limit: 5,
    });
    res.json(result);
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
