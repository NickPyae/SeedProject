let User = require('../models/user');
let chai = require('chai');
let chaiHttp = require('chai-http');
var server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('User', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    describe('/POST signup', () => {
      it('should POST user data', (done) => {
        let user = {
            userName: 'ppk',
            password: 'ppk'
        };

        chai.request(server).post('/user/signup').send(user).end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('user');
            done();
        });
      });

      it('should not POST user data if they are empty', (done) => {
        let mockUser = {
            userName: '',
            password: ''
        };

        chai.request(server).post('/user/signup').send(mockUser).end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
      });
    });

});