const flightController = require('./flight.controller');
const {shouldAuthenticate, testWrongParams} = require('../test/functions');

describe('Flight routes', () => {
    let stub;

    describe('GET /flights/route/:route/', () => {

        before(() => {
            stub = sinon.stub(flightController, 'showRoutes');
        });

        after(() => {
            stub.restore();
        });

        it('Should access the route with correct params', function (done) {
            const route = 'GRU-SDU';
            const input_file = 'input-file.txt';
            shouldAuthenticate(chai.request(app).get(`/flights/route/${route}?input_file=${input_file}`), null, done, stub, []);
        });

        it('Should enforce valid parameter input_file', function (done) {
            const route = 'GRU-SDU';
            const verify = ['input_file'];
            testWrongParams(chai.request(app).get(`/flights/route/${route}`), {}, verify, done);
        });

    });

    describe('POST /flights/route/:route/', () => {

        before(() => {
            stub = sinon.stub(flightController, 'saveRoute');
        });

        after(() => {
            stub.restore();
        });

        it('Should access the route with correct params', function (done) {
            const route = 'GRU-SDU';
            const input_file = 'input-file.txt';
            const price = 75;
            shouldAuthenticate(chai.request(app).post(`/flights/route/${route}?input_file=${input_file}&price=${price}`), null, done, stub, []);
        });

        it('Should enforce valid parameter input_file and price', function (done) {
            const route = 'GRU-SDU';
            const verify = ['input_file', 'price'];
            testWrongParams(chai.request(app).post(`/flights/route/${route}`), {}, verify, done);
        });

    });

});