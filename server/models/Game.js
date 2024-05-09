const mongoose = require('mongoose');

const { Schema } = mongoose;

const gameSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    players: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        score: [{
            holeNumber: {
                type: Number,
                required: true
            },
            playerPar: {
                type: Number,
                required: true
            }
        }]
    }]
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;