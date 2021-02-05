import { param, body } from 'express-validator'

class RoomValidator {
  static create = body('username').exists().notEmpty().isString()

  static join = [
    param('roomId').exists().isUUID(),
    body('username').exists().notEmpty().isString(),
  ]
}

export default RoomValidator
