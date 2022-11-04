const router = require('express').Router();
const { createUser, login } = require('../controllers/auth');

const { validateSignUp, validateSignIn } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');
const { shadowsRoutes } = require('./shadows');
const NotFoundError = require('../errors/not_found_error');

router.post('/register', validateSignUp, createUser);
router.post('/login', validateSignIn, login);

router.use(auth);
router.use(shadowsRoutes);

router.all('*', () => {
  throw new NotFoundError('Такой страницы не существует');
});

module.exports = router;