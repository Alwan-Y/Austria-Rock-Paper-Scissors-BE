import { Room } from '../../models'

class RoomController {
  static create = (req, res) => {
    const { roomId } = req.body
    const { userId } = req.param 

    Room.findOne({
      where: { roomId },
    }).then(
      (room) => {
        if (room) {
          return res.status(400).json({ status: 400, message: 'Room already exist' })
        }

        return Room.create({
          roomName,
          firstPlayer: userId,
          status: 'waiting for player 2',
        }).then(
          (data) => res.status(201).json({ ...data.dataValues }),
        ).catch(
          (e) => {
            console.log(e)
            res.status(500).json({ message: e })
          },
        )
      },
    ).catch(
      (e) => {
        console.log(e)
        res.status(500).json(e)
      },
    )
  }

  static update = (req, res) => {
    const { roomId } = req.params

    return Room.findOne({
      where: { roomId },
    }).then(
      (room) => {
        if (!room) return res.status(404).json({ message: 'Not found' })

        const {
          firstPlayer,
          secondPlayer,
          firstPlayerChoice,
          secondPlayerChoice,
          result,
        } = req.body

        return room.update(
          {
            firstPlayer,
            secondPlayer,
            firstPlayerChoice,
            secondPlayerChoice,
            result,
          },
        ).then(
          (updated) => res.status(200).json({ ...updated.dataValues }),
        )
      },
    ).catch(
      (e) => {
        console.log(e)
        res.status(500).json({ message: e })
      },
    )
  }

  static delete = (req, res) => {
    const { roomId } = req.params

    return Room.destroy({
      where: { roomId },
    }).then(
      (room) => {
        if (!room) return res.status(404).json({ message: 'Not found' })

        return res.status(200).json({ message: 'Deleted' })
      },
    ).catch(
      (e) => {
        console.log(e)
        res.status(500).json({ message: e })
      },
    )
  }
}

export default RoomController
