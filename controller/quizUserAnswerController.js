const AnswerModel = require('./../models/quizUserAnswerModel');

exports.getAllAnswers = async (req, res) => {
    try {
        const answers = await AnswerModel.find();
        res.status(200).json({
            status: 'success',
            answers
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed'
        })
    }
}

exports.getAnswer = async (req, res) => {
    try {
        const answer = await AnswerModel.findOne({ quiz: req.params.quizId, user: req.user._id });
        if (!answer)
            return res.status(200).json({
                status: 'success',
                message: 'Not found!!'
            })
        return res.status(200).json({
            status: 'success',
            answer
        })
    } catch (err) {
        console.log(err)
        return res.json({
            status: 'failed',
            err
        })
    }
}
exports.updateAnswer = async (req, res) => {
    try {
        const answer = await AnswerModel.findByIdAndUpdate(req.params.answerId, req.body);
        res.status(200).json({
            status: 'success',
            answer
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed'
        })
    }
}
exports.deleteAnswer = async (req, res) => {
    try {
        await AnswerModel.findByIdAndDelete(req.params.answerId);
        res.status(200).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed'
        })
    }
}
exports.createNewAnswer = async (req, res) => {
    try {
        const newAnswer = new AnswerModel({
            user: req.user._id,
            quiz: req.params.quizId,
            question: req.body.question
        })
        await newAnswer.save();
        res.status(200).json({
            status: 'success',
            newAnswer
        })

    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed',
            err
        })
    }
}

exports.getUserAnswer = async (req, res) => {
    try {
        const userAnswers = await AnswerModel.find({ user: req.user._id });
        if (!userAnswers)
            return res.status(200).json({
                status: 'success',
                message: 'No Answerd Quizzes yet'
            })

        res.status(200).json({
            status: 'success',
            userAnswers
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed',
            err
        })
    }
}