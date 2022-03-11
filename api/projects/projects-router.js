// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Project = require('./projects-model');
const { validateProjectId, validateProject } = require('./projects-middleware');

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            if(!projects) {
                res.status(200).json([]);
            } else {
                res.status(200).json(projects);
            }
        })
        .catch(next);
})

router.get('/:id', validateProjectId, (req, res, next) => {
    res.json(req.project);
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(next);
})

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;

    if(!name || !description || completed === undefined) {
        res.status(400).json({ message: 'missing required fields' });
    } else {
        Project.get(id)
            .then(project => {
                if(!project) {
                    res.status(404).json({ message: 'project does not exist'});
                } else {
                    return Project.update(req.params.id, req.body);
                }
            })
            .then(data => {
                if(data) {
                    return Project.get(req.params.id);
                }
            })
            .then(project => {
                if(project) {
                    res.status(200).json(project);
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'project could not be updated'});
            })
    }
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Project.remove(req.params.id)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(next);
})

router.get('/:id/actions', (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            if(!actions) {
                res.status(404).json({ message: 'not found' });
            }
            res.status(200).json(actions);
        })
        .catch(next);
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
})

module.exports = router;
