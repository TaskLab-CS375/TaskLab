module.exports = function(app, pool) {
    app.post("/addProject", function (req, res) {
        let body = req.body;
        console.log(body);
        // Update table projects, userprojects
    // NEED TO FIX TIMESTAMP PROBLEM
        pool.query(
            "INSERT INTO Projects (projectName, groupID, projectStatus) VALUES($1, (SELECT groupID FROM groups WHERE groups.groupName=$2), $3) RETURNING projectid;",
            [body.name, body.group, body.status]
        )
            .then(function (response) {
                console.log("first insert", response.rows);
            });
        pool.query(
                "INSERT INTO UserProjects (projectID, userID) VALUES((SELECT projectid FROM Projects WHERE projectName=$1),(SELECT userID FROM Users WHERE Users.email=$2));",
                [body.name, body.userID]
            )
            .then(function (response) {
                console.log("inserted");
            });
        pool.query(
            "SELECT P.projectID, P.projectName, G.groupName, P.projectStatus, P.startTime, P.endTime FROM userGroups UG, users U, projects P, groups G WHERE U.email=$1 and U.userID = UG.userID and P.groupID=UG.groupID and G.groupID=UG.groupID;",
            [body.userID]
        )
            .then(function (response) {
                console.log("final result", response.rows);
                return res.status(200).json({rows: response.rows});
            })
            .catch(function (error) {
                console.log(error);
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
}