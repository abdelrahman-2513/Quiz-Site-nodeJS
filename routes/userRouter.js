const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');

const router = express.Router();

router.post('/signUp', authController.signUp);
router.post('/logIn', authController.logIn);
router.get('/logOut', authController.loggingOut);
router.route('/topUsers').get(userController.getTopUsers)
router.use(authController.protect)
router.route('/updateMe').patch(authController.updateMe)
router.route('/updatePassword').patch(authController.updatePassword)
router.route('/').get(userController.getAllusers).post(authController.restrictTo('admin'), userController.createUser)
router.route('/:userId').get(authController.restrictTo('user', 'admin'), userController.getuser).patch(authController.restrictTo('admin'), userController.updateuser).delete(authController.restrictTo('admin'), userController.deleteuser)


module.exports = router;