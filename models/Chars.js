import mongoose from 'mongoose';

const CharSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true,
        //TODO, consider separating subraces
        enum: [dwarf, elf, halfling, human, dragonborn, gnome, half-elf, half-orc, tiefling]
    },
    class: {
        type: String,
        required: true,
        enum: [barbarian, bard, cleric, druid, fighter, monk, paladin, 
            ranger, rogue, sorcerer, warlock, wizard]
    },
    alignment: {
        type: String,
        required: true,
        enum: ["lawful good", "lawful neutral", "lawful evil",
                "neutral good", "true neutral",  "neutral evil", 
                "chaotic good", "chaotic neutral",  "chaotic evil" ]
    },
    background: {
        type: String,
        required: true,
        enum: [acolyte, charlatan, criminal, entertainer, "folk hero", 
        "guild artisan", hermit, noble, outlander, sage, sailor, soldier, urchin]
    }
});

const Character = mongoose.model('character', CharSchema);

export default Character;