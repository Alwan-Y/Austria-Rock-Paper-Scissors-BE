import { Feedback } from '../../models'

class FeedbackController {
  static get = (req, res) => Feedback.findAll()
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(500).json({ message: 'Internal Server Error' }))

  static create = (req, res) => {
    const { username, feedback } = req.body

    return Feedback.create({
      username,
      feedback,
    })
      .then(() => res.status(200).json({ message: 'Thank you for your feedback' }))
      .catch((err) => res.status(500).json({ message: 'Internal Server Error' }))
  }
}

export default FeedbackController
