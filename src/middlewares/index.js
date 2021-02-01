import { validationResult } from 'express-validator'

class Middleware {
  static messageBuilder = async (errors = []) => {
    const message = []

    errors.forEach((e) => {
      const msgItem = `${e.msg} for ${e.param}`

      if (!message.includes(msgItem)) {
        message.push(msgItem)
      }
    })

    return message
  }

  static validate = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: await this.messageBuilder(errors.array()) })
    }

    return next()
  }
}

export default Middleware
