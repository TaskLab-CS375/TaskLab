module.exports = function (app, pool) {
    app.post('/addGroup', function (req, res) {
        let body = req.body;

        pool.query(
            'SELECT groupName FROM Groups WHERE groupName = $1',
            [body.name]
        ).then(function (response) {
            if (response.rows.length !== 0) {
                return res.status(400).send('Group already exist!');
            }

            pool.query(
                "INSERT INTO Groups (groupName) VALUES($1);",
                [body.name]
            ).then(function (response) {
                console.log("Inserted Group:", response.rows);

                pool.query(
                    "INSERT INTO UserGroups (groupID, userID) VALUES((SELECT groupID FROM Groups WHERE groupName=$1),(SELECT userID FROM Users WHERE Users.email=$2));",
                    [body.name, body.userID]
                ).then(function (response) {
                    console.log("Inserted UserGroup:", response.rows);

                    res.sendStatus(200);
                });
            });
        });
    });
}