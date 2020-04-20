"use strict";

class Route {
  constructor(method, path, reqHandler) {
    this.method = method;
    this.path = path;
    this.reqHandler = reqHandler;
  }
}

module.exports = Route;
