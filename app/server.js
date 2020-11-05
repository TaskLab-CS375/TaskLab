const pg = require("pg");
const path = require('path');
const express = require("express");

const app = express();

const reactPath = '/../tasklab/build'

// Serve static files from the React app
app.use(express.static(path.join(__dirname, reactPath)));
app.use(express.static("public_html"));
app.use(express.json());

const port = 3000;
const hostname = "localhost";

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

const bcrypt = require("bcrypt");

const saltRounds = 10;

app.post('/api/register', function (req, res) {
    const { email, password } = req.body;

    if(email === undefined || password === undefined) {
        res.status(401).send();
        return;
    }

    pool.query(
        'SELECT password FROM users WHERE email = $1',
        [email]
    ).then(function (response) {
        if (response.rows.length !== 0) {
            return res.status(401).send('Email already exist!');
        }
    });

    bcrypt
        .hash(password, saltRounds)
        .then(function (hashedPassword) {
            pool.query(
                'INSERT INTO users (email, password) VALUES ($1, $2)',
                [email, hashedPassword]
            ).then(function (response) {
                res.status(200).send(response);
            }).catch(function (error) {
                res.status(500).send(error);
            })
        })
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + reactPath + '/index.html'));
});
  

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});