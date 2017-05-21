import express from 'express'
import { SampleRoutes } from './routes/SampleRoute'
import { SampleMiddleware } from './middlewares/SampleMiddleware'
import { JWTRoutes } from './routes/JWTRoute'

export const Router = [{
    path: "/",
    middleware: [SampleMiddleware.anyCheck, SampleMiddleware.anyCheckTwo],
    handler: SampleRoutes,
},{
    path: "/JWT",
    middleware: [SampleMiddleware.anyCheck, SampleMiddleware.anyCheckTwo],
    handler: JWTRoutes,
}]
