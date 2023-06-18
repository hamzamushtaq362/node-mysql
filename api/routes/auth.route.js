const express = require('express');
const auth = require('./../controller/auth.controller');
const authMiddleware = require('./../middlewares/auth.middleware');
const router = express.Router();
router.post('/login',auth.login);
// authMiddleWare.auth,
// router.post('/user', auth.user);
router.get('/users', auth.users);
// router.post('/signup',authMiddleware.auth, auth.signup);
router.post('/signup', auth.signup);

module.exports = router;