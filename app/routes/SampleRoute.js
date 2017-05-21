import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('ok')
})

export const SampleRoutes = router
