import express from 'express'
import * as SampleController from '../controllers/SampleController'

const router = express.Router()

router.get('/', SampleController.index)
router.get('/:id', SampleController.find)
router.post('/', SampleController.create)
router.put('/', SampleController.update)
router.delete('/', SampleController.remove)

export const SampleRoutes = router
