const quizModel = require('./../models/quizModel');

exports.getAllQuizes = async (req, res) => {
    try {
        const Quizzes = await quizModel.find().populate({ path: 'questions', select: 'title choices' });

        res.status(200).json({
            status: 'success',
            Quizzes
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed'
        })

    }
}
exports.getQuiz = (req, res) => {

    console.log(req.user)
    quizModel.findOne({ _id: req.params.quizId }).populate({ path: 'questions' }).then(async quiz => {
        res.status(200).json({
            status: 'success',
            quiz
        })
    }).catch(err => {
        console.log(err);
        res.status(404).json({
            status: 'failed'
        })

    });
}
exports.createQuiz = async (req, res) => {
    try {
        const newQuiz = await quizModel.create(req.body);
        res.status(200).json({
            status: 'success',
            newQuiz
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed'
        })
    }
}
exports.updateQuiz = async (req, res) => {
    try {
        const updatedQuiz = await quizModel.findByIdAndUpdate(req.params.quizId, req.body);

        res.status(200).json({
            status: 'success',
            updatedQuiz
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed'
        })

    }
}
exports.deleteQuiz = async (req, res) => {
    try {
        await quizModel.findByIdAndDelete(req.params.quizId);

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
exports.getNewestQuizzes = async (req, res) => {
    try {
        // let year = req.params.year * 1;
        // console.log(new Date(`${year}-01-01`));
        // const newQuizzes = await tourModel.aggregate([
        //     {
        //         $unwind: '$startDates'
        //     },
        //     {
        //         $match: {
        //             startDates: {
        //                 $gte: new Date(`${year}-01-01`),
        //                 $lte: new Date(`${year}-12-31`)
        //             }
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: { $month: '$startDates' },
        //             numTours: { $sum: 1 },
        //             tours: { $push: '$name' }
        //         }
        //     },
        //     {
        //         $sort: {
        //             numTours: -1
        //         }
        //     }, {
        //         $addFields: { month: '$_id' }
        //     }, {
        //         $project: { _id: 0 }
        //     }


        // ]);
        const newQuizzes = await quizModel.find().populate({ path: 'questions', select: 'title choices' });

        res.status(200).json({
            status: 'success',
            newQuizzes
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed'
        })


    }
}