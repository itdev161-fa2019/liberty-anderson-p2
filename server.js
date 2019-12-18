import express from  'express';
import connectDatabase from './config/db';
import {check, validationResult} from 'express-validator';
import cors from 'cors';
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
 * @route GET /
 * @desc Test endpoint
 */
app.get('/', (req, res) =>
    res.send('http get request sent to root api endpoint')
);

/**
 * @route POST api/chars
 * @desc create character
 */
/*
app.post('/api/chars', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
*/
app.post('/api/chars', 
[
    check('name', 'Please enter character name').not().isEmpty(),
    check('race', 'Please enter the character\'s race').not().isEmpty(),
    check('race','Please enter a valid race').isIn(races),
    check('class','Please enter the character\'s class').not().isEmpty(),
    check('class', 'Please enter a valid class').isIn(classes),
    check('alignment','Please enter the character\'s alignment').not().isEmpty(),
    check('alignment', 'Please enter a valid alignment').isIn(alignments),
    check('background','Please enter the character\'s background').not().isEmpty(),
    check('background', 'Please enter a valid background').isIn(backgrounds)
],
(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        return res.send(req.body);
    }
});

//listener
const port = 5000;
app.listen(port, () => console.log(`Express server running on port ${port}`));

