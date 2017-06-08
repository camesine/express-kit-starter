import express from 'express'
import * as SampleController from '../controllers/SampleController'

const router = express.Router()

router.get('/', SampleController.Index)
router.get('/:id', SampleController.find)
router.post('/', SampleController.Create)
router.put('/', SampleController.Update)
router.delete('/', SampleController.remove)

export const SampleRoutes = router
