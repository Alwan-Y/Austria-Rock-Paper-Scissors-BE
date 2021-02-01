import { History } from '../../models'

class HistoryController {
  static get = (req, res) => History.findAll()
    .then((histories) => res.status(200).json(histories))
    .catch((e) => {
      console.log(e)

      return res.status(500).json({ message: 'Internal server error' })
    })

  static getById = (req, res) => {
    const { id } = req.params

    History.findOne({ where: { id } })
      .then((history) => res.status(200).json(history))
      .catch((e) => {
        console.log(e)

        return res.status(500).json({ message: 'Internal server error' })
      })
  }

  static delete = (req, res) => {
    const { id } = req.params

    return History.destroy({ where: { id } })
      .then((user) => {
        if (user) return res.status(200).json({ message: 'History successfully deleted' })

        return res.status(404).json({ message: 'History not found' })
      })
      .catch((e) => {
        console.log(e)

        return res.status(500).json({ message: 'Internal server error' })
      })
  }
}

export default HistoryController
