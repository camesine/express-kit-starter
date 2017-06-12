import config from '../config'
import { signToken } from '../app/services/JWTService'
import { Listar } from '../app/services/SampleService'
import chai from 'chai'
import chai_http from 'chai-http'
import mongoose from 'mongoose'

const URI = 'http://127.0.0.1:' + config.PORT
let token = null
let IdRecord = null
chai.use(chai_http)

mongoose.connect(config.DATABASE.SERVER)
mongoose.Promise = global.Promise

describe('ALL ', () => {

    before((done) => {

        const payload = { user: 'user', password: 'pass' }        
        Promise.all([
            signToken(payload),
            Listar()
        ]).then((res) => {
            token = res[0]
            IdRecord = res[1][0]._id
            done()
        })
    
    })

    it('SAMPLE CONTROLLER GET FIND ALL', (done) => {
        chai.request(URI).get('/').set('Authorization', `bearer ${token}`).end((err, res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res).to.be.json
            chai.expect(res.body).to.be.a('array')
            chai.expect(res.body[0]).to.have.all.keys('_id', 'text', '__v')
            chai.expect(res.body[0].text).to.be.a('string')
            done()
        })
    })

    it('SAMPLE CONTROLLER POST FIND ONE', (done) => {
        chai.request(URI).get('/' + IdRecord).set('Authorization', `bearer ${token}`).end((err, res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res).to.be.json
            chai.expect(res.body).to.be.a('array')
            chai.expect(res.body[0]).to.have.all.keys('_id', 'text', '__v')
            chai.expect(res.body[0].text).to.be.a('string') 
            done()
        })
    })

    it('SAMPLE CONTROLLER POST CREATE', (done) => {
        const sample = {text: 'Sample'}
        chai.request(URI).post('/').set('Authorization', `bearer ${token}`).send({sample}).end((err, res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res).to.be.json
            chai.expect(res.body).to.have.all.keys('_id', 'text', '__v')
            chai.expect(res.body._id).to.be.a('string')
            chai.expect(res.body.text).to.be.a('string')
            done()
        })
    })

    it('SAMPLE CONTROLLER PUT UPDATE', (done) => {
        const sample = {_id: IdRecord, text: 'SAMPLE TEXT'}
        chai.request(URI).put('/').set('Authorization', `bearer ${token}`).send({sample}).end((err, res) => {
            console.log(res.body)
            chai.expect(res).to.have.status(200)
            chai.expect(res).to.be.json
            chai.expect(res.body).to.have.all.keys('n', 'nModified', 'ok')
            chai.expect(res.body._id).to.be.a('string')
            chai.expect(res.body._id).to.be.a('string')
            chai.expect(res.body._id).to.be.a('string')
            done()
        })
    })

})
