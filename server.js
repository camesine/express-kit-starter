import bodyParser from 'body-parser'
import cluster from 'cluster'
import cors from 'cors'
import express from 'express'
import http from 'http'
import methodOverride from 'method-override'
import { Router } from './app/Router'
import { cpus } from 'os'

if (cluster.isMaster) {
    
    const numCPUs = cpus().length
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
        console.log('Starting a new worker')
        cluster.fork()
    })

} else {

    const app = express()
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json({ limit: '50mb'} ))
    app.use(methodOverride())

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS')
        next()
    })

    app.use(cors())

    app.use((err, req, res, next)=> {
        const error = new Error('Not found')
        err.status = 404
        next(err)
    })

    Router.forEach((row) => {
        app.use(row.path, row.middleware, row.handler)
    })

    app.use((req, res, next) => {
        res.status(404)
        res.json({ error: 'Not found' })
        next()
    })

    app.use((err, req, res, next)  => {
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({ error: 'Please send a valid Token...' })
        }
        next()
    })

    app.use((err, req, res, next) => {
        res.status(err.status || 500)
        res.json({ error: err.message })
        next()
    })

    const port = process.env.PORT || 3000
    const server = http.createServer(app)

    server.listen(port)
    
    server.on("error", (error) => {
        if (error.syscall !== "listen") {
            throw error
        }

        const bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port

        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges")
                process.exit(1)
                break
            case "EADDRINUSE":
                console.error(bind + " is already in use")
                process.exit(1)
                break
            default:
                throw error
        }
    })

    server.on("listening", () => {
        const addr = server.address()
        const bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port
        console.log('Server is running in process ' + process.pid + ' listening on PORT ' + addr.port + '\n')
    })

}
