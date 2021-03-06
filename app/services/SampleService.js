import { Sample } from '../models/Sample'

export const Crear = (sample) => {
    return Sample.create(sample)
}

export const Listar = () => {
    return Sample.find()
}

export const Editar = (sample) => {
    return Sample.update({
        '_id': sample._id
    }, {
        'text': sample.text
    })
}

export const Eliminar = (id) => {
    return Sample.remove({
        '_id': id
    })
}

export const Buscar = (id) => {
    return Sample.find({
        '_id': id
    })
}
