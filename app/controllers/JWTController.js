import { JWTService } from '../services/JWTService'

const Controller = {
    index: async (req, res) => {
        const payload = req.body.payload
        const token = await JWTService.signToken(payload)

        res.send(token)
    }
}

export const JWTController = Controller
