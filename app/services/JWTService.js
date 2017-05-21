import JWT from 'jsonwebtoken'
import bearer from 'token-extractor'
import { config } from '../../config/config'

export const JWTService = {

    signToken: (params, options) => {
        return new Promise((resolve, reject) => {
            JWT.sign(params, config.SECRET, options || null, (err, token) => {
                if (err)  reject(err)
                resolve(token)
            })
        })
    },
    verifyToken: (token, options) => {
        return new Promise((resolve, reject) => {
           JWT.verify(token, config.SECRET, (err, decoded) => {
                if (err) reject(err)
                resolve(decoded)
            })
        })
    },
    extractToken: (req) => {
        return new Promise((resolve, reject) => {
            bearer(req, (err, token) => {
                if (err) return reject(err)
                resolve(token)
            })
        })
    }
}
