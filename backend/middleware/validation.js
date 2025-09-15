const { validationResult } = require('express-validator');

// This is more of a pattern than a single middleware file.
// Example usage is in the route files themselves.

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// You can export specific validation chains if you want to reuse them.
// For example:
const { body } = require('express-validator');

const loginValidation = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
];

module.exports = {
  validate,
  loginValidation,
};
