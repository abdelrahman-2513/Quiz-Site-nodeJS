const mongoose = require('mongoose');


const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name must be given'],
    },
    questionsNumber: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: [true, 'The Description must be given!']
    },
    complexity: {
        type: String,
        enum: ['easy', 'intermediate', 'advanced'],
        required: [true, "The complexity must be given"]
    },
    time: {
        type: Number,
        required: [true, 'The Quiz time is required!']
    },
},
    {
        toJSON: { virtuals: true },
        toObject: {
            virtuals: true
        },

    }
)

quizSchema.virtual('questions', {
    ref: 'Question',
    foreignField: 'quiz',
    localField: '_id',
    justOne: false
})

const Quiz = new mongoose.model('Quiz', quizSchema);
module.exports = Quiz;

