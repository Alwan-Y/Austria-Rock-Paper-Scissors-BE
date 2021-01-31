import { History, sequelize } from '../../models';

const { Op } = require('sequelize');

class LeaderboardController {
  static getLeaderboardRank = (req, res) => {
    History.findAll({
      attributes: [
        'result',
        [sequelize.fn('COUNT', sequelize.col('result')), 'n_results'],
      ],
      group: ['result'],
      where: {
        result: {
          [Op.like]: '%Win',
        },
      },
      order: [
        [[sequelize.col('n_results'), 'DESC']],
      ],
      limit: 1,
    })
      .then((data) => {
        const username = data[0].dataValues.result.split(' ')[0];
        const score = data[0].dataValues.n_results;
        res.status(200).json({ username, score })
      })
      .catch((err) => console.log(err))
  }
}

export default LeaderboardController;
