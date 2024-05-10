const mongoose = require('mongoose');

const { Schema } = mongoose;

const holeSchema = new mongoose.Schema({
    holeNumber: {
        type: Number,
        required: true
    },
    par: {
        type: Number,
        required: true
    }
});

const courseSchema = new Schema({
    
    courseName: {
        type: String,
        required: true,
        trim: true,
    },
    numberOfHoles: {
        type: Number,
        required: true
    },
    holes: [holeSchema],
    totalPar: {
        type: Number,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;