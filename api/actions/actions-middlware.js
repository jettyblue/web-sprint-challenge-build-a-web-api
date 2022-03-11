// add middlewares here related to actions

const Action = require('./actions-model');

async function validateActionId(req, res, next) {
    try {
        const action = await Action.get(req.params.id);
        if(!action) {
            res.status(404).json({ message: 'action not found' });
        } else {
            req.action = action;
            next();
        }
    }
    catch (err) {
        res.status(500).json({ message: 'could not find action' });
    }
    next();
}

function validateAction(req, res, next) {
    const { project_id, notes, description } = req.body;
    if(!project_id || !notes || !description) {
        res.status(400).json({ message: 'missing required fields'});
    } else {
        req.project_id = project_id;
        req.notes = notes;
        req.description = description;
        next();
    }
}

module.exports = {
    validateActionId,
    validateAction,
}
