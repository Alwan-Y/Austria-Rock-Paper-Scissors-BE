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

    static join = async (req, res) => {
      const { roomId } = req.params
      const { username } = req.body

      const room = await Room.findOne({
        where: { id: roomId },
      })

      if (!room) {
        return res.status(400).json({ message: 'Not found' })
      }

      // eslint-disable-next-line max-len
      const rejoinRoom = await Room.findOne({ where: { and: [{ id: roomId }, { playerOneUsername: username }, { playerTwoUsername: username }] } })

      if (rejoinRoom) {
        return res.status(200).json({ roomId })
      }

      // eslint-disable-next-line max-len
      const availableRoom = await Room.findOne({ where: { and: [{ id: roomId }, { playerTwoUsername: null }] } })

      if (!availableRoom) {
        return res.status(400).json({ message: 'Room is full' })
      }

      return room.update({ playerTwoUsername: username })
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
    }
}

export default RoomController
