import express from  'express';
import connectDatabase from './config/db';
import {check, validationResult} from 'express-validator';
import {races, classes, alignments, backgrounds} from './values.js';


//init express app
const app = express();

connectDatabase();

//configure middleware
app.use(express.json({ extended: false }));

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
//TODO change "3000" to a const referenced elsewhere
app.listen(3000, () => console.log(`Express server running on port 3000`));

