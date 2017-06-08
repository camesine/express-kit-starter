import mongoose from 'mongoose'

const SampleSchema = mongoose.Schema({
    text: String
})

export const Sample = mongoose.model('samples', SampleSchema)
