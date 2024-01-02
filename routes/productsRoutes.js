const express = require('express');
const router = express.Router();
const Model = require('../models/Product');

router.get('/', async (req, res) => {
    const allEntries = await Model.find({}, { __v: 0 })
        .populate('supplier');

    res.json(allEntries);
});

router.get('/:id', async (req, res) => {
    const requestedEntry = await Model.findById(req.params.id);
    res.json(requestedEntry);
});

router.post('/', async (req, res) => {
    const entryToAdd = await Model.create(req.body);
    res.status(201).send(`${entryToAdd.name} was added`);
});

router.delete('/:id', async (req, res) => {
    const entryToDelete = await Model.findByIdAndDelete(req.params.id);
    res.send(`${entryToDelete.name} was deleted`);
});

router.patch('/:id', async (req, res) => {
    const entryToUpdate =
        await Model.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.send(`entry with id ${entryToUpdate._id} was updated`);
});

module.exports = router;