const pg = require("pg");
const path = require('path');
const express = require("express");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');

const app = express();

const reactPath = '/../tasklab/build'

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

const bcrypt = require("bcrypt");

const saltRounds = 10;

const secret = env["secret"];

app.post('/api/register', function (req, res) {
    const { firstName, lastName, email, password } = req.body;

    if(email === undefined || password === undefined) {
        return res.status(401).send();
    }

    pool.query(
        'SELECT password FROM users WHERE email = $1',
        [email]
    ).then(function (response) {
        if (response.rows.length !== 0) {
            return res.status(401).send('Email already exist!');
        }

        bcrypt
            .hash(password, saltRounds)
            .then(function (hashedPassword) {
                pool.query(
                    'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)',
                    [firstName, lastName, email, hashedPassword]
                ).then(function (response) {
                    const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                }).catch(function (error) {
                    console.log(error);
                    res.status(500).send(error);
                })
            })
    });
})

app.post('/api/login', function (req, res) {
    const { email, password } = req.body;

    pool.query(
        'SELECT password FROM users WHERE email = $1',
        [email]
    ).then(function (response) {
        if (response.rows.length === 0) {
            return res.status(401).send();
        }

        let hashedPassword = response.rows[0].password;
        bcrypt
            .compare(password, hashedPassword)
            .then(function (isSame) {
                if(isSame) {
                    const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                } else {
                    return res.status(401).send();
                }
            }).catch(function (error) {
                return res.status(500).send(error);
        })
    }).catch(function (error) {
        return res.status(500).send(error);
    })
});

app.post("/addProject", function (req, res) {
    let body = req.body;
    pool.query(
        "INSERT INTO Projects (projectName, groupID, projectStatus, startTime, endTime) VALUES($1, $2, $3, $4, $5) RETURNING *; INSERT INTO UserProjects (projectID, userID) VALUES($6,$7)",
        [body.projectName, body.groupID, body.projectStatus, body.startTime, body.endTime, body.projectID, body.userID]
    )
        .then(function (response) {
            console.log(response.rows);
            res.status(200).send(response.rows);
        })
        .catch(function (error) {
            return res.sendStatus(500);
        });
});

app.get("/getProject", function (req, res) {
    let userEmail = req.query.userID;
    console.log(userEmail);
    pool.query("SELECT P.projectID, P.projectName, G.groupName, P.projectStatus, P.startTime, P.endTime FROM userGroups UG, users U, projects P, groups G WHERE U.email=$1 and U.userID = UG.userID and P.groupID=UG.groupID and G.groupID=UG.groupID;", [userEmail])
        .then(function (response) {
            console.log(response.rows);
            return res.status(200).json({rows: response.rows});
        })
        .catch(function (error) {
            console.log(error);
            return res.sendStatus(500);
        });
});

app.get('/checkToken', withAuth, function (req, res) {
    res.sendStatus(200);
});

app.get('/logout', function (req, res) {
    res.clearCookie('token', {
        httpOnly: true
    });
    res.redirect('/');
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + reactPath + '/index.html'));
});
  

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});