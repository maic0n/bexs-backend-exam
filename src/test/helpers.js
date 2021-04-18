const chai = require('chai');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.use(chaiHttp);

global.app = require('../index');
global.should = chai.should();
global.chai = chai;
global.sinon = require('sinon');
global.forEach = require('mocha-each');
