import { Feedback } from '../../models'

class FeedbackController {
  static getFeedback = (req, res) => Feedback.findAll()
    .then((data) => res.status(200).json({ data }))
    .catch((err) => console.log(err))

  static postFeedback = (req, res) => {
    const { username, feedback } = req.body

    return Feedback.create({
      username,
      feedback,
    })
      .then(() => res.status(200).json({ message: 'Thank you for your feedback' }))
      .catch((err) => console.log(errs))
  }
}

export default FeedbackController
