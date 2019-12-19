import express from  'express';
import connectDatabase from './config/db';
import {check, validationResult} from 'express-validator';
import cors from 'cors';
import config from 'config'; //???
import Character from './models/Character';
import {races, classes, alignments, backgrounds} from './values.js';


//init express app
const app = express();

connectDatabase();

//configure middleware
app.use(express.json({ extended: false }));
app.use(
	cors({
		origin: 'http://localhost:3000'
	})
);

// api endpoints
/**
 * @route GET api/chars
 * @desc get characters
 */
app.get('/api/chars', async (req, res) =>{
	try {
		const chars = await Character.find();

		res.json(chars);
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
});

/**
 * @route POST api/chars
 * @desc create character
 */

app.post('/api/chars', 
	[
		check('name', 'Please enter character name').not().isEmpty(),
		check('race', 'Please enter the character\'s race').not().isEmpty(),
		check('race','Please enter a valid race').isIn(races),
		check('cClass','Please enter the character\'s class').not().isEmpty(),
		check('cClass', 'Please enter a valid class').isIn(classes),
		check('alignment','Please enter the character\'s alignment').not().isEmpty(),
		check('alignment', 'Please enter a valid alignment').isIn(alignments),
		check('background', 'Please enter a valid background').isIn(backgrounds)
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		} else {
			const { name, race, cClass, alignment, background } = req.body;
			try {

				const newChar = new Character({
					name: name,
					race: race,
					cClass: cClass,
					alignment: alignment,
					background: background
				});

				//save to db
				await newChar.save();

				res.json(newChar);
			} catch (error) {
				console.error(error);
				res.status(500).send('Server error');
			}
		}
	}
);

//listener
const port = 5000;
app.listen(port, () => console.log(`Express server running on port ${port}`));

