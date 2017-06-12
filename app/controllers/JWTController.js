import { signToken } from '../services/JWTService'

export const index = async (req, res) => {
    const payload = req.body.payload
    const token = await signToken(payload)

    res.json(token)
}
