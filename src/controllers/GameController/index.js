import { Room, History, sequelize } from '../../models'
import GameService from '../../services/GameService'

class GameController {
  static get = (req, res) => {
    const { roomId } = req.params

    return Room.findOne(
      {
        include: [{
          model: History,
          attributes: ['playerOneChoice', 'playerTwoChoice', 'result'],
        }],
        where: { id: roomId },
      },
    ).then(
      (room) => {
        if (!room) return res.status(400).json({ message: 'game does not exist' })

        return res.status(200).json({ room })
      },
    ).catch(
      (e) => {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' })
      },
    )
  }
}

export default GameController
