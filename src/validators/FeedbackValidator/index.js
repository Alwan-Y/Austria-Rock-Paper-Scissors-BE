import { body } from 'express-validator'

class FeedbackValidator {
  static create = [
    body('username').exists().notEmpty().isString(),
    body('feedback').exists().notEmpty().isString(),
  ]
}

export default FeedbackValidator
