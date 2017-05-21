import express from 'express'
import { SampleRoutes } from './routes/SampleRoute'
import { SampleMiddleware } from './middlewares/SampleMiddleware'

export const Router = [{
    path: "/",
    middleware: [SampleMiddleware.anyCheck, SampleMiddleware.anyCheckTwo],
    handler: SampleRoutes,
}]
