const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Model = require('../models/User');

router.get('/', async (req, res) => {
    const allEntries = await Model.find({}, { __v: 0 });
    res.json(allEntries);
});

router.get('/:id', async (req, res) => {
    const requestedEntry = await Model.findById(req.params.id);
    res.json(requestedEntry);
});

router.post('/', async (req, res) => {
	try {
		const givenPassword = req.body.password;

		const hashedPassword = await bcrypt.hash(givenPassword, 10);

		const newUser = {
			name: req.body.name,
			password: hashedPassword,
		};

        await Model.create(newUser);
		
		res.sendStatus(201);
	}
	catch (err) {
		res.sendStatus(500);
	}
});

router.post('/login', async (req, res) => {
	// find user by name
	// const user = users.find(curUser => curUser.name === givenName);
    const user = await Model.findOne({ name: req.body.name });

	if (!user) {
		res.status(400).send('unknown username');
		return;
	}

	const hashedSaltedPass = user.password;

	const givenPassword = req.body.password;

	try {
		if (await bcrypt.compare(givenPassword, hashedSaltedPass))
			res.send('success');
		else
			res.status(401).send('not allowed');
	}
	catch {
		res.status(500).send('server error');
	}
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