import { param, body } from 'express-validator'

class RoomValidator {
  static create = [
    param('userId').exists().isString(),
    body('roomId').exists().isString(),
  ]
}

export default RoomValidator
