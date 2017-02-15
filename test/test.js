var supertest = require('supertest');
var should = require('should');

// This agent refers to PORT where program is runninng.
var server = supertest.agent('http://localhost:4200/');

// UNIT test begin

describe("Server",function(){
  // #1 should return home page

  it('should return home page', function(done){

    // calling home page api
    server
    .get('/')
    .expect('Content-type', 'text/html')
    .end(function(err,res){
        res.status.should.equal(200);
        done();
    });
  });
});