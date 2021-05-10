function findAndSaveUser(Users) {
  Users.findOne({})
    .then((user) => {
      user.name = 'zero';
      return user.save();
    })
    .then(() => {
      console.log(user.name);
      return Users.findOne({ gender: 'm' });
    })
    .then(() => {
      console.log('아쉽네');
    })
    .catch((err) => {
      console.error(err);
    });
}
