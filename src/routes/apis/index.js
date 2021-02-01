import express from 'express'
import GameController from '../../controllers/GameController'
import RoomValidator from '../../validators/RoomValidator'
import RoomController from '../../controllers/RoomController'

const router = express.Router()

router.get('/games/:roomId', GameController.get)
router.post('/games/:roomId', GameController.create)

router.post('/', [RoomValidator.create, Middleware.Auth], RoomController.create)
router.patch('/:roomName', Middleware.Auth, RoomController.update)
router.delete('/:roomName', Middleware.Auth, RoomController.delete)

export default router
