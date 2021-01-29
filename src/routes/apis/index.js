import express from 'express'
import GameController from '../../controllers/GameController'

const router = express.Router()

router.get('/games/:roomId', GameController.get)

export default router
