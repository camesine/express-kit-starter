import jwt from 'express-jwt'
import config from '../config'
import { SampleRoutes } from './routes/SampleRoute'
import { anyCheck, anyCheckTwo } from './middlewares/SampleMiddleware'
import { JWTRoutes } from './routes/JWTRoute'

export const LoadRouter = (app) => {
    app.use('/JWT', [anyCheck, anyCheckTwo], JWTRoutes)
    app.use('/', [jwt({secret: config.SECRET})], SampleRoutes)
}
