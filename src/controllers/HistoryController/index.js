import { History, Room } from '../../models'

class HistoryController {
  static get = (req, res) => {
    History.findAll(
      {
        include: [{
          model: Room,
          attributes: ['playerOneUsername', 'playerTwoUsername'],
          order: [['round', 'DESC']],
        }],
      },
    ).then(
      (histories) => {
        if (!histories) return res.status(404).json({ message: 'let\'s play a game first' })

        return res.status(200).json(histories)
      },
    ).catch((e) => {
      console.log(e)

      return res.status(500).json({ message: 'Internal server error' })
    })
  }

  static getById = (req, res) => {
    const { historyId } = req.params

    return History.findOne(
      {
        include: [{
          model: Room,
          attributes: ['playerOneUsername', 'playerTwoUsername'],
          order: [['round', 'DESC']],
        }],
        where: { id: historyId },
      },
    ).then(
      (histories) => {
        if (!histories) return res.status(404).json({ message: 'let\'s play a game first' })

        return res.status(200).json(histories)
      },
    ).catch((e) => {
      console.log(e)

      return res.status(500).json({ message: 'Internal server error' })
    })
  }

  static delete = (req, res) => {
    const { historyId } = req.params

    return History.destroy({ where: { id: historyId } })
      .then((history) => {
        if (history) return res.status(200).json({ message: 'History successfully deleted' })

        return res.status(404).json({ message: 'History not found' })
      })
      .catch((e) => {
        console.log(e)

        return res.status(500).json({ message: 'Internal server error' })
      })
  }
}

export default HistoryController
