import { Op } from 'sequelize'
import { Room, History, sequelize } from '../../models'

class StatisticService {
  static getTotalAppearances = async (username) => {
    const result = await History.findOne(
      {
        attributes: [[sequelize.fn('count', ''), 'appearance']],
        include: [{
          model: Room,
          attributes: [],
          where:
          {
            [Op.or]:
            [{ playerOneUsername: username }, { playerTwoUsername: username }],
          },
        }],
        where: {
          result: {
            [Op.not]: null,
          },
        },
        raw: true,
      },
    )

    const { appearance } = result

    return appearance
  }

  static getTotalWins = async (username) => {
    const result = await History.findOne(
      {
        attributes: [[sequelize.fn('count', ''), 'win']],
        where:
        {
          result:
            {
              [Op.iLike]: `${username} WIN%`,
            },
        },
        raw: true,
      },
    )

    const { win } = result

    return win
  }

  static getTotalChoiceUsed = async (choice, username) => {
    const { playerOneTotal } = await History.findOne(
      {
        attributes: [[sequelize.fn('count', ''), 'playerOneTotal']],
        include: [{
          model: Room,
          attributes: [],
          where: { playerOneUsername: username },
        }],
        where: {
          [Op.and]: [{ playerOneChoice: choice }, { result: { [Op.not]: null } }],
        },
        raw: true,
      },
    )

    const { playerTwoTotal } = await History.findOne(
      {
        attributes: [[sequelize.fn('count', ''), 'playerTwoTotal']],
        include: [{
          model: Room,
          attributes: [],
          where: { playerTwoUsername: username },
        }],
        where: {
          [Op.and]: [{ playerTwoChoice: choice }, { result: { [Op.not]: null } }],
        },
        raw: true,
      },
    )

    return (parseInt(playerOneTotal) + parseInt(playerTwoTotal))
  }

  static getStatistic = async (username) => {
    const appearance = await this.getTotalAppearances(username)
    if (parseInt(appearance) === 0) {
      return {
        appearance: 0, winRate: 0, rockRate: 0, paperRate: 0, scissorsRate: 0,
      }
    }

    const win = await this.getTotalWins(username)
    const winRate = ((win / appearance) * 100).toFixed(0)
    const totalRock = await this.getTotalChoiceUsed('rock', username)
    const rockRate = ((totalRock / appearance) * 100).toFixed(0)
    const totalPaper = await this.getTotalChoiceUsed('paper', username)
    const paperRate = ((totalPaper / appearance) * 100).toFixed(0)
    const totalScissors = await this.getTotalChoiceUsed('scissors', username)
    const scissorsRate = ((totalScissors / appearance) * 100).toFixed(0)

    return {
      appearance, winRate, rockRate, paperRate, scissorsRate,
    }
  }
}

export default StatisticService
