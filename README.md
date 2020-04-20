# Simplex-Http-Server

### A simple Node.js Http-Server with router

- MIME types for most common files
- Serves HTML, JS, CSS, plain text and images
- Serves index.html as a default directory index
- Responds with error codes for missing files
- Ability to set route aliases
- Ability to set custom routes

## Getting started

```
git clone https://github.com/nvrenuff/simplex-http-server
npm start
```

## Usage

```
const HttpServer = require("./server");

const app = new HttpServer();
const port = 4001;

app.get("/users", function (req, res) {
  res.statusCode = 200;
  res.end(`from custom handler ${req.url}`);
});

app.listen(port);
```

## Static assets

Static assets are served from /public directory

- /public - HTML files
- /public/static
  - /public/static/css - CSS files
  - /public/static/images - Images
  - /public/static/js - Javascript files

## Route Aliases

Route aliases can be set in /routes/aliases.js

```
  "/": "/index.html",
  "/about": "/about.html",
  "/contact": "/contact.html",
  "404": "/404.html",
```
