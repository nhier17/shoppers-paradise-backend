const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions} = require('../Middleware/authentication')

const {getAllUsers} = require('../Controllers/user')

router.route('/').get(authenticateUser,authorizePermissions('admin'), getAllUsers)

module.exports = router;