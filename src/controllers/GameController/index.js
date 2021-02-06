import { Room, History, sequelize } from '../../models'
import GameService from '../../services/GameService'

class GameController {
  static get = (req, res) => {
    const { roomId } = req.params

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
      (room) => {
        if (!room) return res.status(400).json({ message: 'game does not exist' })

        req.app.get('RealtimeService').broadcast('oke', { room }, 'room1')

        return res.status(200).json({ room })
      },
    ).catch(
      (e) => {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' })
      },
    )
  }

  static create = (req, res) => {
    /**
     * @todo:
     * 1. validate latest game was finished
     * 2. validate creator is room's member
     * 3. validate room's member is full
     * 4. validate latest round was finished
     * 5. return created game round
     * 6. Need to decouple this long logic
     */

    const { roomId } = req.params
    const { username } = req.body

    return Room.findOne(
      {
        where: { id: roomId },
      },
    ).then(
      (room) => {
        if (!room) return res.status(400).json({ message: 'game does not exist' })

        const { playerOneUsername, playerTwoUsername } = room

        if (!(playerOneUsername && playerTwoUsername)) {
          return res.status(400).json({ message: 'Please find other player to go to next round' })
        }

        if (![playerTwoUsername, playerOneUsername].includes(username)) {
          return res.status(400).json({ message: 'game can only be played by room\'s member' })
        }

        return History.findOne(
          {
            where: { roomId },
            order: [['round', 'DESC']],
            limit: 1,
          },
        ).then(
          (ltsHistory) => {
            const { result: gameResult, round } = ltsHistory

            if (!gameResult) return res.status(400).json({ message: 'Please finish current round to go to next round' })

            return History.create(
              { round: (round + 1), roomId },
            ).then(
              (history) => {
                console.log(history)
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
              },
            ).catch(
              (e) => {
                console.log(e)
                return res.status(500).json({ message: 'Internal Server Error' })
              },
            )
          },
        ).catch(
          (e) => {
            console.log(e)
            return res.status(500).json({ message: 'Internal Server Error' })
          },
        )
      },
    ).catch(
      (e) => {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' })
      },
    )
  }

  static play = async (req, res) => {
    const tran = await sequelize.transaction()

    try {
      const { roomId } = req.params
      const { username, choice } = req.body

      const room = await Room.findOne(
        {
          where: { id: roomId },
        },
      )

      const history = await History.findOne(
        {
          where: { roomId },
          order: [['round', 'DESC']],
          limit: 1,
        },
      )

      const { playerOneUsername, playerTwoUsername } = room
      const { playerOneChoice, playerTwoChoice, id } = history

      const playedRoom = {
        playerOneUsername, playerTwoUsername, playerOneChoice, playerTwoChoice,
      }

      return GameService.validatePlayer(playedRoom, username, choice)
        .then(async (player) => {
          let playerChoiceToSet = { playerOneChoice: choice }

          if (player === 'secondPlayer') {
            playerChoiceToSet = { playerTwoChoice: choice }
          }

          return History.update(
            playerChoiceToSet,
            {
              where: { id }, returning: true, plain: true, transaction: tran,
            },
          ).then(async (updatedGame) => {
            const result = await GameService.getResult(
              {
                playerOneUsername,
                playerTwoUsername,
                playerOneChoice: updatedGame[1].dataValues.playerOneChoice,
                playerTwoChoice: updatedGame[1].dataValues.playerTwoChoice,
              },
            )

            const gameResult = await History.update(
              { result },
              {
                where: { id }, returning: true, plain: true, transaction: tran,
              },
            )

            res.status(200).json(
              { room: { ...room.dataValues, Histories: gameResult[1].dataValues } },
            )

            return tran.commit();
          }).catch(async (e) => {
            console.log(e);
            await tran.rollback();
            return res.status(500).json({ message: 'Internal Server Error' })
          })
        })
        .catch(async (e) => {
          console.log(e)
          await tran.rollback();
          return res.status(400).json({ message: e })
        })
    } catch (e) {
      console.log(e)
      await tran.rollback();
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

export default GameController
