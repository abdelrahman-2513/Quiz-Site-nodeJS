const mongoose = require('mongoose');

const userAnswerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'there must be user for the answers']
    },
    question: [{
        type: mongoose.Schema.Types.ObjectId,
        answer: {
            type: String,
        }
    }]
})

const userAnswerModel = new mongoose.model('UserAnswer', userAnswerSchema);

module.exports = userAnswerModel;