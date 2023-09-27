const express = require('express');
const quizController = require('./../controller/quizController');
const authController = require('./../controller/authController')
const router = express.Router();

router.route('/').get(quizController.getAllQuizes).post(authController.protect, authController.restrictTo('admin'), quizController.createQuiz)
router.route('/newQuizzes').get(quizController.getNewestQuizzes)
router.use(authController.protect)
router.route('/:quizId').get(authController.restrictTo('user', 'admin'), quizController.getQuiz).patch(authController.restrictTo('admin'), quizController.updateQuiz).delete(authController.restrictTo('admin'), quizController.deleteQuiz)


module.exports = router;