import express from 'express'
import Middleware from '../../middlewares'
import GameController from '../../controllers/GameController'
import GameValidator from '../../validators/GameValidator'
import LeaderboardController from '../../controllers/LeaderboardController'
import FeedbackController from '../../controllers/FeedbackController'
import FeedbackValidator from '../../validators/FeedbackValidator'
import RoomController from '../../controllers/RoomController'
import RoomValidator from '../../validators/RoomValidator'
import HistoryValidator from '../../validators/HistoryValidator'
import HistoryController from '../../controllers/HistoryController'
import StatisticController from '../../controllers/StatisticController'
import StatisticValidator from '../../validators/StatisticValidator'
import UserController from '../../controllers/UserController'
import UserValidator from '../../validators/UserValidator'

const router = express.Router()

router.get('/games/:roomId', [GameValidator.get, Middleware.validate], GameController.get)
router.post('/games/:roomId', [GameValidator.create, Middleware.validate], GameController.create)
router.patch('/games/:roomId', [GameValidator.play, Middleware.validate], GameController.play)

router.get('/leaderboard', LeaderboardController.get)

router.get('/feedback', FeedbackController.get)
router.post('/feedback', [FeedbackValidator.create, Middleware.validate], FeedbackController.create)

router.post('/rooms', [RoomValidator.create, Middleware.validate], RoomController.create)
router.patch('/rooms/:roomId', [RoomValidator.join, Middleware.validate], RoomController.join)

router.get('/history', HistoryController.get)
router.get('/history/:historyId', [HistoryValidator.get, Middleware.validate], HistoryController.getById)
router.delete('/history/:historyId', [HistoryValidator.delete, Middleware.validate], HistoryController.delete)
router.get('/statistic/:username', [StatisticValidator.get, Middleware.validate], StatisticController.get)

router.post('/user', [UserValidator.create, Middleware.validate], UserController.create)
router.post('/update-user', UserController.setUserToAdmin)
router.post('/get-status', UserController.getStatusUser)
router.post('/change-password', UserController.changePassword)

export default router
