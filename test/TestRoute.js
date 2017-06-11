import config from '../config'
import Chai from 'chai'
import Chai_http from 'chai-http'

const URI = 'http://127.0.0.1:' + config.port
Chai.use(Chai_http)

describe('All: ', () => {

    it('Test', (done) => {
        done()
    })

})
