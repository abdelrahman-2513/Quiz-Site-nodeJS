const mongoose = require('mongoose');
const Quiz = require('./quizModel')

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The question must be added!']
    },
    choices: [{

        text: {
            type: String,
            required: [true, 'The choices must be given']
        },
        isCorrect: {
            type: Boolean,
            required: [true, 'The correctness of the choice is required']
        }
    }
    ],
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: [true, 'The question must have a quiz']
    }

})

questionSchema.statics.calculateNumberQuestions = async function (quizId) {
    const stats = await this.aggregate([
        { $match: { quiz: quizId } },
        {
            $group: {
                _id: '$quiz',
                number: { $sum: 1 }
            }
        }
    ])
    return stats
}
questionSchema.post('save', async function () {
    const stats = await this.constructor.calculateNumberQuestions(this.quiz);
    console.log(stats[0].number)
    console.log(this.quiz)
    await Quiz.findByIdAndUpdate(this.quiz, {
        questionsNumber: stats[0].number
    })
})
const Question = new mongoose.model('Question', questionSchema);

module.exports = Question;