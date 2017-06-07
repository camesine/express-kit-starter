import { Schema, model } from 'mongoose'

const SampleSchema = Schema({
    text: String
})

export const Sample = model('sample', SampleSchema)
