const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions} = require('../Middleware/authentication')

const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../Controllers/user')

router.route('/').get(authenticateUser,authorizePermissions('admin'), getAllUsers)
router.route('/currentUser').get(authenticateUser, showCurrentUser)
router.route('/updateUser').patch(authenticateUser, updateUser)

router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)

router.route('/:id').get(authenticateUser,getSingleUser);

module.exports = router;