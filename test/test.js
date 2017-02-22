var User = require('../models/user');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('User', function() {
    describe('POST /user/signup', function() {
      it('should POST user data', function(done) {
        var user = {
            userName: 'pyaephyokyaw009',
            email: 'pyaephyokyaw009@gmail.com',
            password: 'ppK12345'
        };

        chai.request(server).post('/user/signup').send(user).end(function(err, res) {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('user');
            done();
        });
      });

      it('should not POST user data if userName and password are empty', function(done) {
        var mockUser = {
            userName: '',
            password: ''
        };

        chai.request(server).post('/user/signup').send(mockUser).end(function(err, res) {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
      });

      it('should not POST user data if userName and password are incorrect', function(done) {
        var mockUser = {
            userName: 'asfsfsa',
            password: 'asfsfa'
        };

        chai.request(server).post('/user/signup').send(mockUser).end(function(err, res) {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
      });
    });

    describe('POST /user/authenticate', function() {
        it('should be authenticated if userName and password are correct', function(done) {
            var mockUser = {
                userName: 'pyaephyokyaw009',
                password: 'ppK12345'
            };

            chai.request(server).post('/user/authenticate').send(mockUser).end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.a.property('token');
                done();
            });
        });

          it('should not be authenticated if userName and password are incorrect', function(done) {
            var mockUser = {
                userName: 'pyaephyokyaw',
                password: 'ppK12345'
            };

            chai.request(server).post('/user/authenticate').send(mockUser).end(function(err, res) {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.a.property('error');
                done();
            });
        });

        it('should not be authenticated if userName and password are empty', function(done) {
            var mockUser = {
                userName: '',
                password: ''
            };

            chai.request(server).post('/user/authenticate').send(mockUser).end(function(err, res) {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.a.property('error');
                done();
            });
        });
    
    });

    describe('GET /user/dashboard', function() {
        it('should not be able to access if it is not authorized', function(done) {
            chai.request(server).get('/user/dashboard').end(function(err, res) {
                res.should.have.status(401);
                done();
            });
        });

        xit('should be able to access if there is an authorization token in header', function(done) {
            var testToken = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInVzZXJOYW1lIjoiaW5pdCIsInJvbGUiOiJpbml0IiwiY3JlYXRlZF9hdCI6ImluaXQiLCJ1cGRhdGVkX2F0IjoiaW5pdCIsIl9fdiI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsInJvbGUiOnRydWUsImNyZWF0ZWRfYXQiOnRydWUsInVwZGF0ZWRfYXQiOnRydWUsInBhc3N3b3JkIjp0cnVlLCJlbWFpbCI6dHJ1ZSwidXNlck5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJyb2xlIjoiQ2xpZW50IiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMjBUMDc6MzE6MjQuODAxWiIsInVwZGF0ZWRfYXQiOiIyMDE3LTAyLTIwVDA3OjMxOjI0LjgwMVoiLCJfX3YiOjAsInBhc3N3b3JkIjoiJDJhJDEwJENMNzV4Vy9ZL253cmdRUWlqWllkenUwLlBCUjBkdjNlSzN6cU5OV040SFBObEZkc0dWejV5IiwiZW1haWwiOiJweWFlcGh5b2t5YXcwMDlAZ21haWwuY29tIiwidXNlck5hbWUiOiJweWFlcGh5b2t5YXcwMDkiLCJfaWQiOiI1OGFhOWI0Yzc2MTI0MTQwNjA4NmY4ZjUifSwiaWF0IjoxNDg3NTc1ODkyLCJleHAiOjE0ODc1ODU5NzJ9.WpuR48p2fF9EAl5-AhQmQ-Ge2QI69f5FAbN-RlbU68E";
  
            chai.request(server).get('/user/dashboard').set('authorization', testToken).end(function(err, res) {
                res.should.have.status(200);
                done();
            });

        });
    });

    describe('DELETE /user/:userId', function() {
        xit('should be able to delete user if userId is correct', function(done) {
            var mockUserId = '58ad2d8fed60fa28f6631971';
            chai.request(server).delete('/user/delete/' + mockUserId).end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.a.property('userId');
                done();
            });
        });

         xit('should not be able to delete user if userId is not correct', function(done) {
            var mockUserId = '58ad2d8fed6';
            chai.request(server).delete('/user/delete/' + mockUserId).end(function(err, res) {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.a.property('error');
                done();
            });
        });
    });

     // remove the user after all test suites
     after(function(done) {
         User.remove({}, function(err) {
             done();
         });
    });

});