import express from 'express'
import GameController from '../../controllers/GameController'
import LeaderboardController from '../../controllers/LeaderboardController'

const router = express.Router()

router.get('/leaderboard', LeaderboardController.getLeaderboardRank);
router.get('/games/:roomId', GameController.get)
router.post('/games/:roomId', GameController.create)

export default router
