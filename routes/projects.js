const express = require('express');
const router = express.Router();

const auth = require('./helpers/auth');
const Project = require('../models/project');
const User = require('../models/user');
const tasks = require('./tasks');
const Task = require('../models/task');

//index
// router.get('/', (req, res, next) => {
//   Project.find({}, 'topic', function(err, projects) {
//     if(err) {
//       console.error(err);
//     } else {
//       res.render('projects/index', { projects: projects });
//     }
//   });
// });

router.get('/', auth.requireLogin, (req, res, next) => {
  Project.find({users: res.locals.currentUserId}, 'topic', function(err, projects) {
    if (err) {
      console.error(err);
    }
    res.render('projects/index', { projects:projects });
  });
});

//new
router.get('/new', auth.requireLogin, (req, res, next) => {
  res.render('projects/new')
});

//show
router.get('/:id', auth.requireLogin, (req, res, next) => {
  Project.findById(req.params.id, function(err, project) {
    if(err) { console.error(err) };

    Task.find({ project: project }, function(err, tasks) {
     if(err) { console.error(err) };

    res.render('projects/show', { project, tasks });
    });
  });
});

//edit
router.get('/:id/edit', auth.requireLogin, (req, res, next) => {
  // TODO
});

//update
router.post('/:id', auth.requireLogin, (req, res, next) => {
  // TODO
});

//create
router.post('/', auth.requireLogin, (req, res, next) => {
  const project = new Project(req.body);
  console.log(req.body);
  project.users.push(req.session.userId);

  const usernames = req.body.share.split(", ");
  const findUsers = [];

  for (let i = 0; i < usernames.length; i += 1) {
    const username = usernames[i];
    const user = User.findOne({ username });
    findUsers.push(user);

  }
 Promise.all(findUsers).then((users) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i] !== null) {
        project.users.push(users[i]);
      }
    }
    return project.save();
  }).then((project) => {
    console.log(project);
    return res.redirect('/projects');
  }).catch((err) => {
    console.log(err.message);
  });


  // project.save(function(err, project) {
  //   if(err) { console.error(err) };
  //
  //   return res.redirect('/projects');
  // });
});



router.use('/:projectId/tasks', tasks);

module.exports = router;
