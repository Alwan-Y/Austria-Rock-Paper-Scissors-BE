import StatisticService from '../../services/StatisticService'

class StatisticController {
  static get = async (req, res) => {
    try {
      const { username } = req.params

      const statistic = await StatisticService.getStatistic(username)

      return res.json(statistic)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

export default StatisticController
