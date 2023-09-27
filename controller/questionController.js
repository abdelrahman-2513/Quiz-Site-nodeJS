const questionsModel = require('./../models/questionsModel');

exports.getAllQuestions = async (req, res) => {
    try {
        const Questions = await questionsModel.find();

        res.status(200).json({
            status: 'success',
            Questions
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed'
        })

    }
}
exports.getQuestion = async (req, res) => {
    try {
        const Question = await questionsModel.findById(req.params.questionId);

        if (!Question)
            res.status(401).json({
                status: 'failed',
                message: 'This Question not found yet!'
            })

        res.status(200).json({
            status: 'success',
            Question
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed'
        })

    }
}
exports.createQuestion = async (req, res) => {
    try {
        const newQuestion = new questionsModel({
            quiz: req.params.quizId,
            title: req.body.title,
            choices: req.body.choices
        })
        await newQuestion.save();
        res.status(200).json({
            status: 'success',
            newQuestion
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed'
        })

    }
}
exports.updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await questionsModel.findByIdAndUpdate(req.params.questionId, req.body);

        res.status(200).json({
            status: 'success',
            updatedQuestion
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed'
        })

    }
}
exports.deleteQuestion = async (req, res) => {
    try {
        await questionsModel.findByIdAndDelete(req.params.questionId);

        res.status(200).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed'
        })

    }
}