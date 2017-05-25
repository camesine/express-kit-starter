import jwt from 'express-jwt'
import config from '../config'
import { SampleRoutes } from './routes/SampleRoute'
import { anyCheck, anyCheckTwo } from './middlewares/SampleMiddleware'
import { JWTRoutes } from './routes/JWTRoute'

export const Router = [{
    path: "/JWT",
    middleware: [anyCheck, anyCheckTwo],
    handler: JWTRoutes,
},{
    path: "/",
    middleware: [jwt({secret: config.SECRET}), anyCheck, anyCheckTwo],
    handler: SampleRoutes
}]
