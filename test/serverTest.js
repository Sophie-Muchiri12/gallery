process.env.NODE_ENV = 'test';   

var chai = require('chai');
var chaiHttp = require('chai-http');

var app = require('../server');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe('Photos', function(){

        after(function(done) {
        if (mongoose.connection.readyState === 1) {
            mongoose.connection.close(function() {
                console.log('Database connection closed');
                done();
            });
        } else {
            done();
        }
    });
    
    it('should list ALL photos on / GET', function(done){
        this.timeout(60000);
        chai.request(app)
        .get('/')
        .end(function(err,res){
            res.should.have.status(200);
            res.should.be.html;
            res.body.should.be.a('object')
            done();
        })
    });
})
