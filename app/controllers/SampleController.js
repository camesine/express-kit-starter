import express from 'express'

export const index = (req, res) => {
    res.send('index')
}

export const create = (req, res) => {
    res.send('create')
}

export const update = (req, res) => {
    res.send('update')
}

export const remove = (req, res) => {
    res.send('delete')
}

export const find = (req, res) => {
    res.send('find')
}
