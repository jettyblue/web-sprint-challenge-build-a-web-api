// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Project = require('./projects-model');
const { validateProjectId, validateProject } = require('./projects-middleware');

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(next);
})

router.get('/:id', validateProjectId, (req, res, next) => {
    Project.get(req.params.id)
        .then(project => {
            res.json(project);
        })
        .catch(next);
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert({ name: req.name, description: req.description })
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(next);
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(200).json(updatedProject);
        })
        .catch(next);
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Project.remove(req.params.id)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(next);
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customError: 'uh oh, something went wrong',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router;
