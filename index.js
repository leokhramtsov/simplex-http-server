"use strict";

const HttpServer = require("./server");

const app = new HttpServer();
const port = 4001;

app.get("/users", function (req, res) {
  res.statusCode = 200;
  res.end(`from custom handler ${req.url}`);
});

app.post("/login", function (req, res) {
  res.statusCode = 200;
  res.end(`from custom handler ${req.url}`);
});

app.put("/records", function (req, res) {
  res.statusCode = 200;
  res.end(`from custom handler ${req.url}`);
});

app.delete("/documents", function (req, res) {
  res.statusCode = 200;
  res.end(`from custom handler ${req.url}`);
});

app.listen(port);
