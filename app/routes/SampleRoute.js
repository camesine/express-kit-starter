import express from 'express'
import { SampleController } from '../controllers/SampleController'

const router = express.Router()

router.get('/', SampleController.index)
router.get('/:id', SampleController.find)
router.post('/', SampleController.create)
router.put('/', SampleController.update)
router.delete('/', SampleController.delete)

export const SampleRoutes = router
