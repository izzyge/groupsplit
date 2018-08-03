const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('./helpers/auth');

router.get('/', auth.requireLogin, (req, res, next) => {
  User.find({}, 'username', function(err, users) {
    if(err) {
      console.error(err);
    } else {
      res.render('users/index', { users: users });
    }
  });
});

router.get('/new', (req, res, next) => {
  res.render('users/new');
})

router.post('/', (req, res, next) => {
  const user = new User(req.body);

  user.save(function(err, user) {
    if(err) console.log(err);
    return res.redirect('/users');
  });
})

module.exports = router;
