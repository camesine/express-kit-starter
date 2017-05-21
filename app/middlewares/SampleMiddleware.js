import express from 'express'

export const SampleMiddleware = {
    anyCheck: (req, res, next ) => {

        const value = "this"
        const value2 = "this"
        
        if (value === value2) {
            next()
        }else {
            res.json({ error: 'error anyCheck' })
        }

    },

    anyCheckTwo: (req, res, next) => {

        const value = "this"
        const value2 = "this"

        if (value === value2) {
            next()
        }else {
            res.json({ error: 'error anyCheck' })
        }

    }
}
