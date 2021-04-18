const express = require('express');
const router = express.Router();
const flightController = require('./flight.controller');
const {getFlightValidation, saveRouteValidation} = require('./flight.validations.js');

router.get('/route/:route', getFlightValidation(), async (req, res, next) => {
  try {
      const paramRoute = req.params.route.toUpperCase().split('-');
      if (!paramRoute || paramRoute.length != 2) {
        throw ({success: false, message: 'Wrong route parameter'});
      }
      const result = await flightController.showRoutes(false, req.query.input_file, paramRoute[0], paramRoute[1]);
      return res.json(result);
  } catch (error) {
      next(error);
  }
});

router.post('/route/:route', saveRouteValidation(), async (req, res, next) => {
  try {
      const paramRoute = req.params.route.split('-');
      if (!paramRoute || paramRoute.length != 2) {
        throw ({success: false, message: 'Wrong route parameter'});
      }
      const result = await flightController.saveRoute(req.query.input_file, paramRoute[0], paramRoute[1], req.query.price);
      return res.json(result);
  } catch (error) {
      next(error);
  }
});

module.exports = app => app.use('/flights', router);