const router = require('express').Router();
const { createUser, login, forgottenPass, resetPass } = require('../controllers/auth');

const { validateSignUp, validateSignIn } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');
const { shadowsRoutes } = require('./shadows');
const { userShadowRoutes } = require('./userShadow');
const NotFoundError = require('../errors/not_found_error');

router.post('/register', validateSignUp, createUser);
router.post('/login', validateSignIn, login);
router.post('/forgotten-pass', forgottenPass);
router.post('/reset-pass', resetPass);

router.use(shadowsRoutes);
router.use(auth);
router.use(userShadowRoutes);

router.all('*', () => {
  throw new NotFoundError('Такой страницы не существует');
});

module.exports = router;