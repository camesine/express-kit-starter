import express from 'express'

const Controller = {
    
    index: (req, res) => {
        res.send('index')
    },
    
    create: (req, res) => {
        res.send('create')
    },

    update: (req, res) => {
        res.send('update')
    },

    delete: (req, res) => {
        res.send('delete')
    },

    find: (req, res) => {
        res.send('find')
    },

}

export const SampleController = Controller
