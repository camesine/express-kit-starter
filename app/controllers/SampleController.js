import express from 'express'
import * as SampleService from '../services/SampleService'

export const Index = async (req, res) => {
    const sample = await SampleService.Listar()
    res.send(sample)
}

export const Create = async (req, res) => {
    const sample = req.body.sample
    const result = await SampleService.Crear(sample)
    res.send(result)
}

export const Update = async (req, res) => {
    const sample = req.body.sample
    const result = await SampleService.Editar(sample)
    res.send(result)
}

export const remove = (req, res) => {
    res.send('delete')
}

export const find = (req, res) => {
    res.send('find')
}
