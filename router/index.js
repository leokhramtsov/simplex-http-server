"use strict";

const Route = require("./route");

class Router {
  constructor() {
    this.routes = {};
  }

  get(route, reqHandler) {
    this.routes[route] = new Route("GET", route, reqHandler);
  }

  post(route, reqHandler) {
    this.routes[route] = new Route("POST", route, reqHandler);
  }

  put(route, reqHandler) {
    this.routes[route] = new Route("PUT", route, reqHandler);
  }

  delete(route, reqHandler) {
    this.routes[route] = new Route("DELETE", route, reqHandler);
  }
}

module.exports = Router;
