import express from 'express'
import { SampleController } from '../controllers/SampleController'

const router = express.Router()

router.get('/', SampleController.index)

export const SampleRoutes = router
