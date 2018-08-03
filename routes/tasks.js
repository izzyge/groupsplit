const express = require('express');
const router = express.Router({mergeParams: true});
const auth = require('./helpers/auth');
const Project = require('../models/project');
const Task = require('../models/task');

//new
router.get('/new', auth.requireLogin, (req, res, next) => {
  Project.findById(req.params.projectId, function(err, project) {
    if(err) { console.error(err) };

    res.render('tasks/new', { project: project });
  });
});
//create
router.post('/', auth.requireLogin, (req, res, next) => {
  Project.findById(req.params.projectId, function(err, project) {
    if(err) { console.error(err) };

    let task = new Task(req.body);
    task.project = project;

    task.save(function(err, post) {
      if(err) { console.error(err) };

      return res.redirect(`/projects/${project._id}`);
    });
  });
})

router.get('/:id', auth.requireLogin, (req, res, next) => {
  Project.findById(req.params.id, function(err, project) {
    if(err) { console.error(err) };

    Task.find({ project: project }, function(err, posts) {
      if(err) { console.error(err) };

      res.render('projects/show', { project: project, tasks: tasks });
    });
  });
});

router.delete('/:id', auth.requireLogin, (req, res, next) => {
  Task.findByIdAndDelete(req.params.id).then(() => {
    console.log('*******deleted');
    return res.redirect(`/projects/${req.params.projectId}`);
  }).catch((err) => {
    console.log(err.message);
  });

  console.log(req.params.id);
})

module.exports = router;
