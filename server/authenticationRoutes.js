module.exports = function (app, pool) {
    const withAuth = require('./middleware');
    const jwt = require('jsonwebtoken');
    const env = require("../env.json");

    const bcrypt = require("bcrypt");

    const saltRounds = 10;

    const secret = env["secret"];

    app.post('/api/register', function (req, res) {
        const { firstName, lastName, email, password } = req.body;

        if(email === undefined || password === undefined) {
            return res.status(401).send("Missing email and password");
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
                    ).then(function () {
                        const payload = { email };
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '1h'
                        });
                        res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                    }).catch(function (error) {
                        console.log(error);
                        res.status(500).send('Server error');
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
                return res.status(401).send('Error with username or password');
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
                        return res.status(401).send('Error with username or password');
                    }
                }).catch(function (error) {
                    return res.status(500).send('Error with username or password');
                })
        }).catch(function (error) {
            return res.status(500).send('Server error');
        })
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
}