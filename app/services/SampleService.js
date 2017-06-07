import { Sample } from '../models/Sample'

export const Create = (sample) => {
    return Sample.create(sample)
}

export const findAll = () => {
    return Sample.find({})
}

export const Update = (params, sample) => {
    return Sample.update(params, sample)
}
