const express = require('express');
const userAnswerController = require('./../controller/quizUserAnswerController');
const authController = require('./../controller/authController');

const router = express.Router();
router.route('/').get(userAnswerController.getAllAnswers)
// router.route('/answerId').get(userAnswerController.getAnswer)
//     .patch(userAnswerController.updateAnswer)
//     .delete(userAnswerController.deleteAnswer)
router.route('/user').get(authController.protect, authController.restrictTo('user', 'admin'), userAnswerController.getUserAnswer)
// .patch(userAnswerController.updateUserAnswer)
// .delete(userAnswerController.deleteUserAnswer)
// /api/v1/answer/quizId
router.use(authController.protect)
router.route('/:quizId').post(userAnswerController.createNewAnswer)
router.route('/:quizId/user').get(userAnswerController.getAnswer)


module.exports = router;