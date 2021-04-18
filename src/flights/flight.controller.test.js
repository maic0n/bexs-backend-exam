const flightController = require('./flight.controller');
const {createFlights, deleteTmlFile} = require('./flight.factory');

let input;

describe('Flight controller', () => {

    before(() => {
        input = createFlights();
    });

    after(() => {
        deleteTmlFile(input);
    });

    describe('GET /flights/route/:route/', () => {

        it('Should return the correct route from GRU to CDG', async () => {
            const route = await flightController.showRoutes(true, input, 'GRU', 'CDG');
            should.exist(route);
            route.should.eq('best route: GRU - BRC - SCL - ORL - CDG > $40\n');
        });

    });
   
    describe('POST /flights/route/:route/', () => {

        it('Should append a new route to data file', async () => {
            const route = await flightController.showRoutes(true, input, 'CGH', 'SDU');
            route.should.eq('route not found\n');
            await flightController.saveRoute(input, 'CGH', 'SDU', 15);
            const newRoute = await flightController.showRoutes(true, input, 'CGH', 'SDU');
            should.exist(newRoute);
            newRoute.should.eq('best route: CGH - SDU > $15\n');
        });

    });

});