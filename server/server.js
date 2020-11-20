const pg = require("pg");
const path = require('path');
const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();

const reactPath = '/../client/build'
const projectRoute = require('./projectRoute');
const autheticationRoute = require('./authenticationRoutes');
const groupRoute = require('./groupRoutes')

// Serve static files from the React app
app.use(express.static(path.join(__dirname, reactPath)));
app.use(express.static("public_html"));
app.use(express.json());
app.use(cookieParser());

const port = 3000;
const hostname = "localhost";

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env["database"]);
pool.connect().then(function () {
    console.log(`Connected to database ${env.database.database}`);
});

projectRoute(app, pool);
autheticationRoute(app, pool);
groupRoute(app, pool);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + reactPath + '/index.html'));
});
  

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});