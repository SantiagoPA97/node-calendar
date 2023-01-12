/* 
  Routes 
  host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { createUser, login, updateToken } = require('../controllers/auth');
const { jwtValidator } = require('../middlewares/jwtValidator');

const router = Router();


router.post(
  '/new', 
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'The email has an invalid format.').isEmail(),
    check('password', 'The password is required.').not().isEmpty(),
    fieldValidator
  ],
  createUser
);

router.post(
  '/', 
  [
    check('email', 'The email has an invalid format.').isEmail(),
    check('password', 'The password is required.').not().isEmpty(),
    fieldValidator
  ],
  login
);

router.get('/renew', [jwtValidator], updateToken);

module.exports = router;