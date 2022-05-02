const next = require('next')
const { createServer } = require('https')
const { parse } = require("url");
const fs = require("fs");
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
const httpsOptions = {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem")
};
app.prepare().then(() => {
    createServer(httpsOptions ,(req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl);
  
      
    }).listen(port, (err) => {
      if (err) throw err
      (`> Ready on https://${hostname}:${port}`)
    })
  })