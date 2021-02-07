import { param } from 'express-validator'

class HistoryValidator {
  static get = param('historyId').exists().isUUID()

  static delete = param('historyId').exists().isUUID()
}

export default HistoryValidator
