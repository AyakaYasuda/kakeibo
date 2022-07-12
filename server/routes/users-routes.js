const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const usersController = require('../controllers/users-controller');

router.post(
  '/signup',
  [
    check('username').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  usersController.signup
);
router.post('/login', usersController.login);
router.get('/:uid', usersController.getUserById);

module.exports = router;
