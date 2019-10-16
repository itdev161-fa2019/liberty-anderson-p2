import express from  'express';
import connectDatabase from './config/db';

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
app.post('/api/chars', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});


//listener
//TODO change "3000" to a const referenced elsewhere
app.listen(3000, () => console.log(`Express server running on port 3000`));

