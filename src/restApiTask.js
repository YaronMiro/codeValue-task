require('module-alias/register')
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require('express');
const config = require('config');
const Logger = require("@services/Logger");

const logger = new Logger('APP');

const routes = [
  require("@routes/crawl"),
  require("@routes/links")
]

const app = express();

// Adding Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  Log incoming requests.
app.use((req, res, next) => {
  logger.info(`method [${req.method}] ${req.originalUrl}`);
  next();
});

// Adding Routes.
routes.forEach( ({router, basePath}) => {
  app.use(`${config.get('server.apiBasePath')}/${basePath}`, router)
})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});