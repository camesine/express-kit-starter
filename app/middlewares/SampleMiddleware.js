import express from 'express'

export const anyCheck = (req, res, next ) => {

    const value = "this"
    const value2 = "this"
    
    if (value === value2) {
        next()
    }else {
        res.json({ error: 'error anyCheck' })
    }

}

export const anyCheckTwo = (req, res, next) => {

    const value = "this"
    const value2 = "this"

    if (value === value2) {
        next()
    }else {
        res.json({ error: 'error anyCheck' })
    }

}
