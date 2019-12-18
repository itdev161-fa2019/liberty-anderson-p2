import mongoose from 'mongoose';
import {races, classes, alignments, backgrounds} from '../values.js';

const CharSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    race: {
        type: [String],
        //TODO, consider separating subraces
        enum: races,
        required: true
    },
    class: {
        type: [String],
        enum: classes,
        required: true

    },
    alignment: {
        type: [String],
        enum: alignments,
        required: true
    },
    background: {
        type: [String],
        enum: backgrounds,
        required: true
    }
});

const Character = mongoose.model('character', CharSchema);

export default Character;