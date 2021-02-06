import express from 'express'
import Middleware from '../../middlewares'
import GameController from '../../controllers/GameController'
import GameValidator from '../../validators/GameValidator'
import LeaderboardController from '../../controllers/LeaderboardController'
import FeedbackController from '../../controllers/FeedbackController'
import RoomController from '../../controllers/RoomController'
import RoomValidator from '../../validators/RoomValidator'
import HistoryValidator from '../../validators/HistoryValidator'
import HistoryController from '../../controllers/HistoryController'

const router = express.Router()

router.get('/games/:roomId', [GameValidator.get, Middleware.validate], GameController.get)
router.post('/games/:roomId', [GameValidator.create, Middleware.validate], GameController.create)
router.patch('/games/:roomId', [GameValidator.play, Middleware.validate], GameController.play)

router.get('/leaderboard', LeaderboardController.getLeaderboardRank)

router.get('/feedback', FeedbackController.getFeedback)
router.post('/feedback', FeedbackController.postFeedback)

router.post('/rooms', [RoomValidator.create, Middleware.validate], RoomController.create)
router.patch('/rooms/:roomId', [RoomValidator.join, Middleware.validate], RoomController.join)

router.delete('history/:id', [HistoryValidator.delete, Middleware.validate], HistoryController.delete)

export default router
