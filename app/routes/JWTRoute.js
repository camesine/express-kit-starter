import express from 'express'
import { JWTController } from '../controllers/JWTController'

const router = express.Router()

router.post('/', JWTController.index)

export const JWTRoutes = router
