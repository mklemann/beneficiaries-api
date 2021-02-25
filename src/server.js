const restify = require('restify');
const routes = require('./routes/beneficiary.routes');
require('./database');

class ServerApi {
  constructor() {
    this.server = restify.createServer();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(restify.plugins.bodyParser());
    this.server.use(restify.plugins.queryParser());
  }

  routes() {
    routes.applyRoutes(this.server, '/v1');
    routes.applyRoutes(this.server);
  }
}

module.exports = new ServerApi().server;
