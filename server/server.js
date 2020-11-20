const pg = require("pg");
const path = require('path');
const fs = require('fs');
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

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || "localhost";

let env;

if (fs.existsSync('../env.json')) {
    env = require("../env.json");
}else {
    env = {
        "secret": process.env.secret,
        "database_url": process.env.DATABASE_URL
    }
}

const Pool = pg.Pool;
let pool;

if (env.hasOwnProperty("database")) {
    pool = new Pool(env["database"]);
} else {
    const connectionString = env["database_url"]
    pool = new Pool({
        connectionString,
    });
}

pool.connect().then(function () {
    if (env.hasOwnProperty("database")) {
        console.log(`Connected to database ${env.database.database}`);
    } else {
        console.log(`Connected to database ${env.database_url}`);
    }
});

projectRoute(app, pool);
autheticationRoute(app, pool, env['secret']);
groupRoute(app, pool);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + reactPath + '/index.html'));
});
  

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});