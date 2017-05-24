import express from 'express'
import { index } from '../controllers/JWTController'

const router = express.Router()

router.post('/', index)

export const JWTRoutes = router
