import express from 'express'
import jwt from 'express-jwt'
import { config } from '../config/config'
import { SampleRoutes } from './routes/SampleRoute'
import { SampleMiddleware } from './middlewares/SampleMiddleware'
import { JWTRoutes } from './routes/JWTRoute'

export const Router = [{
    path: "/",
    middleware: [jwt({secret: config.SECRET}), SampleMiddleware.anyCheck, SampleMiddleware.anyCheckTwo],
    handler: SampleRoutes,
},{
    path: "/JWT",
    middleware: [SampleMiddleware.anyCheck, SampleMiddleware.anyCheckTwo],
    handler: JWTRoutes,
}]
