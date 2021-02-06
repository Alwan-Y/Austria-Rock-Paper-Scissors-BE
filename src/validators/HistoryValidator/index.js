import { param } from 'express-validator'

class HistoryValidator {
  static delete = param('id').exists().isUUID()
}

export default HistoryValidator
