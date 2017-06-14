import express from 'express'
import * as SampleService from '../services/SampleService'

export const Index = async (req, res) => {
    const sample = await SampleService.Listar()
    res.send(sample)
}

export const Create = async (req, res) => {
    const sample = req.body.sample
    const result = await SampleService.Crear(sample).catch(err => res.status(404).send({text: 'ERROR'}))
    res.send(result)
}

export const Update = async (req, res) => {
    const sample = req.body.sample
    const result = await SampleService.Editar(sample).catch(err => res.status(404).send({text: 'NOT FOUND'}))
    res.send(result)
}

export const Remove = async (req, res) => {
    const id = req.body.id
    const result = await SampleService.Eliminar(id).catch(err => res.status(404).send({text: 'NOT FOUND'}))
    res.send(result)
}

export const Find = async (req, res) => {
    const id = req.params.id
    const result = await SampleService.Buscar(id).catch(err => res.status(404).send({text: 'NOT FOUND'}))
    res.send(result)
}
