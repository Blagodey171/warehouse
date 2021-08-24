const Router = require('express').Router;
const router = new Router();
const { check } = require('express-validator');
const userHandler = require('../userHandler/userHandler');
const authorizationMW = require('../middleware/authorizationMW')



// router.use(authorizationMW)

router.post('/login', [
    check('login', 'Некорректный логин').isLength({ min: 5, max: 20 }),
    check('password', 'Некорректный пароль').isLength({ min: 5, max: 20 }),
], userHandler().login)

router.post('/registration', [
    check('login', 'Некоректный логин').isLength({ min: 5 }),
    check('password', 'Некоректный пароль').isLength({ min: 5 }),
], userHandler().registration)

router.post('/authorization', userHandler().authorization)

module.exports = router