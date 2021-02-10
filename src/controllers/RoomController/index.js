import { Room, History, sequelize } from '../../models'

class RoomController {
    static create = async (req, res) => {
      const { username } = req.body

      const transaction = await sequelize.transaction()

      try {
        return Room.create({ playerOneUsername: username }, { transaction })
          .then(
            (data) => {
              const roomId = data.dataValues.id

              return History.create({ roomId, round: 1 }, { transaction })
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
                      transaction,
                    },
                  ).then(
                    (room) => {
                      if (!room) return res.status(400).json({ message: 'Room does not exist' })

                      res.status(200).json({ room })

                      return transaction.commit()
                    },
                  ).catch(
                    (e) => {
                      console.log(e)
                      res.status(500).json({ message: 'Internal Server Error' })

                      return transaction.rollback()
                    },
                  ),
                )
            },
          ).catch(
            (e) => {
              console.log(e)
              res.status(500).json({ message: 'Internal Server Error' })

              return transaction.rollback()
            },
          )
      } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Internal Server Error' })

        return transaction.rollback()
      }
    }

    static join = async (req, res) => {
      const { roomId } = req.params
      const { username } = req.body

      try {
        const room = await Room.findOne({
          where: { id: roomId },
        })

        if (!room) {
          return res.status(400).json({ message: 'Room does not exists' })
        }

        const { playerOneUsername, playerTwoUsername } = room.dataValues

        if ([playerOneUsername, playerTwoUsername].includes(username)) {
          return Room.findOne(
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
            (result) => res.status(200).json({ room: result }),
          ).catch(
            (e) => {
              console.log(e)
              return res.status(500).json({ message: 'Internal Server Error' })
            },
          )
        }

        const isRoomAvailable = !playerTwoUsername

        if (!isRoomAvailable) {
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
              (result) => {
                if (!result) return res.status(400).json({ message: 'Room does not exist' })

                return res.status(200).json({ room: result })
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
              return res.status(500).json({ message: 'Internal Server Error' })
            },
          )
      } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' })
      }
    }
}

export default RoomController
