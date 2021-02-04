import express from 'express'
import GameController from '../../controllers/GameController'
import RoomValidator from '../../validators/RoomValidator'
import RoomController from '../../controllers/RoomController'

const router = express.Router()

router.get('/games/:roomId', GameController.get)
router.post('/games/:roomId', GameController.create)

router.post('/room', RoomController.create)
router.patch('/:roomId', RoomController.create)

export default router
