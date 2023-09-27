const express = require('express');
const questionController = require('./../controller/questionController');

const router = express.Router({ mergeParams: true });

router.route('/').get(questionController.getAllQuestions)
router.route('/:quizId').post(questionController.createQuestion)
router.route('/:questionId').get(questionController.getQuestion).patch(questionController.updateQuestion).delete(questionController.deleteQuestion);

module.exports = router;