import express from 'express'
import GameController from '../../controllers/GameController'

const router = express.Router()

router.get('/games/:roomId', GameController.get)
router.post('/games/:roomId', GameController.create)

export default router
