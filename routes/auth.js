/*
    Path: api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { signUp, signIn, renewToken } = require('../controllers/auth');
const { validateAuthFields } = require('../middlewares/validate_auth_fields');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

router.post('/signUp', [
    check('email', 'The email is invalid.').isEmail(),
    check('password', 'The password should be a combination of at least one uppercase, a lower case, one special character, one digit and should be 8 to 20 chararacters long.').isStrongPassword(),
    validateAuthFields,
], signUp);

router.post('/signIn', [
    check('email', 'The email is invalid.').isEmail(),
    check('password', 'The password should be a combination of at least one uppercase, a lower case, one special character, one digit and should be 8 to 20 chararacters long.').isStrongPassword(),
    validateAuthFields,
], signIn);

router.get('/renew', validateJWT, renewToken);

module.exports = router;