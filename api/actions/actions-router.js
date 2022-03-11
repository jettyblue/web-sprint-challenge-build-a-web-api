// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Action = require('./actions-model');
const { validateActionId, validateAction } = require('./actions-middlware');

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            if(!actions) {
                res.status(200).json([]);
            } else {
            res.json(actions);
            }
        })
        .catch(next);
})

router.get('/:id', (req, res, next) => {
    Action.get(req.params.id)
        .then(action => {
            if(!action) {
                res.status(404).json({ message: 'not found'});
            }
            res.json(action);
        })
        .catch(next);
})

router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction);
        })
        .catch(next);
})

router.put('/:id', (req, res, next) => {
    const { notes, description, completed, project_id } = req.body;

    if(!notes || !description || completed === undefined || !project_id) {
        res.status(400).json({ message: 'missing required fields'});
    } else {
        Action.update(req.params.id, req.body)
            .then(updatedAction => {
                res.status(200).json(updatedAction);
            })
            .catch(next);
    }
})

router.delete('/:id', validateActionId, (req, res, next) => {
    Action.remove(req.params.id)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(next);
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
})

module.exports = router;
