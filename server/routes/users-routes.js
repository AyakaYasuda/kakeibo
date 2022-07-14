const { Router } = require('express');
const { check } = require('express-validator');

const checkAuth = require('../middleware/check-auth');
const usersController = require('../controllers/users-controller');

const router = Router();

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
router.use(checkAuth);
router.patch('/:uid', usersController.addBudgetToUser);

module.exports = router;
