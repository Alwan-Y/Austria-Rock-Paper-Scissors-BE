import { param } from 'express-validator'

class StatisticValidator {
  static get = param('username').exists().notEmpty().isString()
}

export default StatisticValidator
