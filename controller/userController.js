const userModel = require('./../models/userModel');
exports.getAllusers = async (req, res) => {
    try {
        const users = await userModel.find().populate('answers');

        res.status(200).json({
            status: 'success',
            users
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed'
        })

    }
}
exports.getuser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId).populate('answers');

        if (!user)
            return res.status(401).json({
                status: 'failed',
                message: 'This user not found yet!'
            })

        // let totalGrade = 0, count = 0;
        // user.answers.forEach(element => {
        //     totalGrade += element.grade;
        //     count++;
        // });
        res.status(200).json({
            status: 'success',
            user
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed'
        })

    }
}
exports.createUser = async (req, res) => {
    try {
        const user = await userModel.create(req.body);
        res.status(201).json({
            status: 'success',
            user
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed'
        })

    }
}
exports.updateuser = async (req, res) => {
    try {
        const updateduser = await userModel.findByIdAndUpdate(req.params.userId, req.body);

        res.status(200).json({
            status: 'success',
            updateduser
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed'
        })

    }
}
exports.deleteuser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.userId);

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
exports.getTopUsers = async (req, res) => {
    try {
        const topUsers = await userModel.aggregate([
            {
                $match: { avgGrade: { $gte: 0 } },

            },

            {
                $project: {
                    name: 1,
                    Quizzes: 1,
                    avgGrade: 1,
                    totalGrade: 1,
                }
            },
            {
                $sort: {
                    Quizzes: -1,
                    totalGrade: -1
                }
            }, {
                $limit: 20
            }
        ])

        res.status(200).json({
            status: 'success',
            topUsers
        })
    } catch (err) {
        console.log(err);

        res.status(404).json({
            status: 'failed',

        })
    }
}