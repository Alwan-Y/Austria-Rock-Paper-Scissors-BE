import express from 'express'
import Middleware from '../../middlewares'
import GameController from '../../controllers/GameController'
import GameValidator from '../../validators/GameValidator'
import RoomController from '../../controllers/RoomController'
import RoomValidator from '../../validators/RoomValidator'

const router = express.Router()

router.get('/games/:roomId', [GameValidator.get, Middleware.validate], GameController.get)
router.post('/games/:roomId', [GameValidator.create, Middleware.validate], GameController.create)
router.patch('/games/:roomId', [GameValidator.play, Middleware.validate], GameController.play)

router.post('/rooms', [RoomValidator.create, Middleware.validate], RoomController.create)
router.patch('rooms/:roomId', [RoomValidator.join, Middleware.validate], RoomController.join)

export default router
