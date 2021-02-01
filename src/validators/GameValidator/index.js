import { param, body } from 'express-validator'

class GameValidator {
  static play = [
    param('roomId').exists().isUUID(),
    body('username').exists().notEmpty().isString(),
    body('choice').exists().notEmpty().isString(),
  ]

  static get = param('roomId').exists().isUUID()

  static create = [
    param('roomId').exists().isUUID(),
    body('username').exists().notEmpty().isString(),
  ]
}

export default GameValidator
