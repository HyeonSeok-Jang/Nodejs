SELECT id, nick FROM users;
SELECT id, ROW_NUMBER() OVER() AS rownum FROM users ORDER BY id ASC;

SELECT u.id, u.nick, p.rownum
FROM users u LEFT JOIN (SELECT id, ROW_NUMBER() OVER() AS rownum
                    FROM users
                    ORDER BY id ASC) p
ON u.id = p.id
WHERE p.rownum>0
AND p.rownum<=5;


router.get('/auth/qna', isLoggedIn, async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Post,
        attributes: ['id', 'nick',],
        sequelize.literal('ROW_NUMBER() OVER(ORDER BY id ASC)','rownum'),
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('qna', {
      title: 'QnA - NodeProject',
      qnas: users,
      signin: true,
      signup: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});





router.post('/', (req, res) => {
        let user_id = req.body.user_id;
        let user_password = req.body.user_password;
        let responseData = {};

        db.query(`SELECT u.id, u.nick, p.rownum
                    FROM users u JOIN (SELECT id, ROW_NUMBER() OVER() AS rownum
                    FROM users
                    ORDER BY id ASC) p
                    ON u.id = p.id
                    WHERE p.rownum>0
                    AND p.rownum<=5;`, (err, rows) => {
          if(err) throw err;
            if(rows.length) {
                console.log(rows);
                responseData.result = 1;
                responseData.data = rows;
            } else {
                responseData.result = "0";
            }
            res.json(responseData);
        });
});