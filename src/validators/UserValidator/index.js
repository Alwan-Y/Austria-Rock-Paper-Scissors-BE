import { body } from 'express-validator'

class UserValidator {
  static create = [
    body('username').exists().notEmpty().isString(),
    body('email').exists().notEmpty().isEmail(),
    body('password').exists().notEmpty().isString(),
  ]
}

export default UserValidator
