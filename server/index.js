"use strict";

const http = require("http");
const path = require("path");
const fs = require("fs");
const Router = require("../router");
const routeAliases = require("../routes/aliases");

class HttpServer extends Router {
  async handleRequests(req, res) {
    const publicPath = path.join(path.resolve(__dirname), "../", "public");
    const normalizedUrl = path.normalize(req.url).replace(/\\/g, "/");
    const urlPath = routeAliases[normalizedUrl] || normalizedUrl;
    const filePath = `${publicPath}${urlPath}`;
    const contentType = this.getFileContentType(urlPath);

    const route = this.routes[req.url];

    // check if custom route
    if (route) {
      if (route.method == req.method) {
        const { reqHandler } = route;

        reqHandler(req, res);
      } else {
        // handling unsupported requests for route
        res.writeHead(405, { "Content-type": "text/plain" });
        res.end(`This route does not support ${req.method} request`);
      }
    } else {
      // learn why you should use streams, instad of fs.readFile
      // https://github.com/substack/stream-handbook

      // if custom route is not found,
      // serve public static files
      const fileStream = fs.createReadStream(filePath);

      fileStream.on("error", function onStreamError(error) {
        res.writeHead(404, { "Content-type": "text/html" });
        fs.createReadStream(`${publicPath}${routeAliases[404]}`).pipe(res);
      });

      fileStream.on("open", function onStreamOpen() {
        res.writeHead(200, { "Content-type": contentType });
        fileStream.pipe(res);
      });
    }
  }

  listen(port) {
    const server = http.createServer(this.handleRequests.bind(this));

    server.listen(port, function onServerListen() {
      console.log(`Listening on port ${port}`);
    });

    server.on("error", function onServerError(error) {
      console.error(error);
    });
  }

  getFileContentType(file) {
    const mime = {
      html: "text/html",
      txt: "text/plain",
      css: "text/css",
      js: "text/javascript",
      gif: "image/gif",
      jpg: "image/jpeg",
      png: "image/png",
      svg: "image/svg+xml",
    };

    return mime[path.extname(file).slice(1)] || "text/plain";
  }
}

module.exports = HttpServer;
