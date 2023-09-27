const mongoose = require('mongoose');
const userModel = require('./userModel');
const questionModel = require('./questionsModel');

const userQuizSchema = new mongoose.Schema({
    grade: {
        type: Number,
        default: 0,
        max: 100
    },
    quiz: {
        type: mongoose.Types.ObjectId,
        ref: 'Quiz',
        required: [true, 'must have quiz!']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'The quiz must have user!']
    },
    question: [{
        id: { type: mongoose.Schema.Types.ObjectId },
        answer: {
            type: String,
        }
    }]
})

userQuizSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'quiz',
        select: 'name questionsNumber complexity duration description'
    }).populate({
        path: 'user',
        select: 'name'
    }).populate({
        path: 'question',
        select: 'title'
    })
    next()
})


userQuizSchema.pre('save', async function (next) {
    if (!this.question)
        return next()
    let grade = 0;
    let questionNumber = 0;
    const questions = await questionModel.find({ quiz: this.quiz });
    questions.forEach(ques => {
        questionNumber++;
        this.question.forEach(ans => {
            if (ques._id.toString() == ans.id.toString())
                ques.choices.forEach(choice => {
                    if (ans.answer === choice.text)
                        if (choice.isCorrect)
                            grade++;
                })
        })
    })
    grade = grade * 100 / questionNumber
    this.grade = grade;
    next()
})
userQuizSchema.statics.calcAvgQuantity = async function (userId) {

    const stats = await this.aggregate(
        [
            {
                $match: { user: userId }
            },
            {
                $group: {
                    _id: '$user',
                    nrating: { $avg: '$grade' },
                    number: { $sum: 1 },
                    total: { $sum: '$grade' }
                }
            }
        ]
    )
    return stats
}

userQuizSchema.post('save', async function () {
    const stats = await this.constructor.calcAvgQuantity(this.user);
    await userModel.findByIdAndUpdate(this.user, {
        avgGrade: stats[0].nrating || 0,
        Quizzes: stats[0].number || 0,
        totalGrade: stats[0].total || 0
    })
})

const userQuizModel = new mongoose.model('UserQuiz', userQuizSchema);

module.exports = userQuizModel;