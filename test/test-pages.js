const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
var request = require('request');


it('Main page content', function(done) {
    request('http://api:3000/empleados' , function(error, response, body) {

        expect(response).to.have.status(200);
        done();
    });

});