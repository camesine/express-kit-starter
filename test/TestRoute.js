import config from '../config'
import * as JWTService   from '../app/services/JWTService'
import * as SampleService from '../app/services/SampleService'
import chai from 'chai'
import chai_http from 'chai-http'
import mongoose from 'mongoose'

const URI = 'http://127.0.0.1:' + config.PORT
let token = null
let IdRecord = null
let IdRecordTwo = null
chai.use(chai_http)

mongoose.connect(config.DATABASE.SERVER)
mongoose.Promise = global.Promise

describe('ALL ', () => {

    before((done) => {

        Promise.all([
            JWTService.signToken({ payload: { user: 'user', password: 'pass' } }),
            SampleService.Crear({ text: "SAMPLE TEXT" })
        ]).then((res) => {
            token = res[0]
            IdRecord = res[1]._id
            done()
        })
    
    })

    after((done) => {
        Promise.all([
            SampleService.Eliminar(IdRecord),
            SampleService.Eliminar(IdRecordTwo)
        ]).then(() => done())
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

    it('SAMPLE CONTROLLER GET FIND ONE', (done) => {
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
            IdRecordTwo = res.body._id
            done()
        })
    })

    it('SAMPLE CONTROLLER PUT UPDATE', (done) => {
        const sample = { _id: IdRecord, text: 'Sample text' }
        chai.request(URI).put('/').set('Authorization', `bearer ${token}`).send({sample}).end((err, res) => {
          chai.expect(res).to.have.status(200)
            chai.expect(res).to.be.json
            chai.expect(res.body).to.have.all.keys('n', 'nModified', 'ok')
            chai.expect(res.body.n).to.be.a('number')
            chai.expect(res.body.nModified).to.be.a('number')
            chai.expect(res.body.ok).to.be.a('number')
            done()
        })
    })

    it('SAMPLE CONTROLLER DELETE REMOVE', (done) => {
        chai.request(URI).del('/').set('Authorization', `bearer ${token}`).send({ id: IdRecord }).end((err, res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res).to.be.json
            chai.expect(res.body).to.have.all.keys('n', 'ok')
            chai.expect(res.body.n).to.be.a('number')
            chai.expect(res.body.ok).to.be.a('number')
            done()
        })
    })

    it('SAMPLE CONTROLLER GET NOT FIND ONE', (done) => {
        chai.request(URI).get('/' + 'XXXX').set('Authorization', `bearer ${token}`).end((err, res) => {
            chai.expect(res).to.have.status(404)
            chai.expect(res).to.be.json
            chai.expect(res.body).to.have.all.keys('text')
            chai.expect(res.body.text).to.be.a('string')
            chai.expect(res.body.text).to.equal('NOT FOUND')
            done()
        })
    })

    it('SAMPLE CONTROLLER ERROR POST CREATE', (done) => {
        chai.request(URI).post('/').set('Authorization', `bearer ${token}`).send({ sample: 'xxx' }).end((err, res) => {
            chai.expect(res).to.have.status(404)
            chai.expect(res).to.be.json
            chai.expect(res.body).to.have.all.keys('text')
            chai.expect(res.body.text).to.be.a('string')
            chai.expect(res.body.text).to.equal('ERROR')
            done()
        })
    })

    it('SAMPLE CONTROLLER ERROR PUT UPDATE', (done) => {
        chai.request(URI).put('/').set('Authorization', `bearer ${token}`).send({ sample: 'XXXX' }).end((err, res) => {
            chai.expect(res).to.have.status(404)
            chai.expect(res).to.be.json
            chai.expect(res.body).to.have.all.keys('text')
            chai.expect(res.body.text).to.be.a('string')
            chai.expect(res.body.text).to.equal('NOT FOUND')
            done()
        })
    })

    it('SAMPLE CONTROLLER ERROR DELETE REMOVE', (done) => {
        chai.request(URI).del('/').set('Authorization', `bearer ${token}`).send({ id: 'XXXX' }).end((err, res) => {
            chai.expect(res).to.have.status(404)
            chai.expect(res).to.be.json
            chai.expect(res.body).to.have.all.keys('text')
            chai.expect(res.body.text).to.be.a('string')
            chai.expect(res.body.text).to.equal('NOT FOUND')
            done()
        })
    })

})
