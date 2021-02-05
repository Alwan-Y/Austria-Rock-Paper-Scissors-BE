/* eslint-disable no-shadow */
import { Room, History } from '../../models'

class RoomController {
    static create = (req, res) => {
      const { username } = req.body

      return Room.create({ playerOneUsername: username })
        .then(
          (data) => {
            const roomId = data.dataValues.id
            return History.create({ roomId, round: 1 })
              .then(
                (history) => Room.findOne(
                  {
                    include: [{
                      model: History,
                      attributes: ['round', 'playerOneChoice', 'playerTwoChoice', 'result'],
                      order: [['round', 'DESC']],
                      limit: 1,
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
                ),
              )
          },
        ).catch(
          (e) => {
            console.log(e)
            res.status(500).json({ message: e })
          },
        )
    }

    static join = (req, res) => {
      const { roomId } = req.params
      const { username } = req.body

      return Room.findOne({ where: { roomId } })
        .then(
          (room) => {
            if (!room) return res.status(404).json({ message: 'Not found' })

            return room.update({ playerOneUsername: username })
              .then(
                (updated) => Room.findOne(
                  {
                    include: [{
                      model: History,
                      attributes: ['round', 'playerOneChoice', 'playerTwoChoice', 'result'],
                      order: [['round', 'DESC']],
                      limit: 1,
                    }],
                    where: { id: roomId },
                  },
                ).then(
                  (room) => {
                    if (!room) return res.status(400).json({ message: 'games does not exist' })

                    return res.status(200).json({ room })
                  },
                ).catch(
                  (e) => {
                    console.log(e)
                    return res.status(500).json({ message: 'Internal Server Error' })
                  },
                ),
              ).catch(
                (e) => {
                  console.log(e)
                  return res.status(500).json({ message: e })
                },
              )
          },
        )
    }
}

export default RoomController
