module.exports = function(app, pool) {
    app.post("/addProject", function (req, res) {
        let body = req.body;
        console.log(body.start, body.end);
        // validation groupID exists
        

        // Update table projects, userprojects
        pool.query(
            "INSERT INTO Projects (projectName, groupID, projectStatus,startTime,endTime) VALUES($1, (SELECT groupID FROM groups WHERE groups.groupName=$2), $3, $4, $5) RETURNING projectid;",
            [body.name, body.group, body.status, body.start, body.end]
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
        console.log("getting project");
        pool.query("SELECT P.projectID, P.projectName, G.groupName, P.projectStatus, P.startTime, P.endTime FROM userGroups UG, users U, projects P, groups G WHERE U.email=$1 and U.userID = UG.userID and P.groupID=UG.groupID and G.groupID=UG.groupID;", [userEmail])
            .then(function (response) {
                return res.status(200).json({rows: response.rows});
            })
            .catch(function (error) {
                console.log(error);
                return res.sendStatus(500);
            });
    });

    // Edit project info - get Info
    app.get("/getProjectInfo", function (req, res) {
        let projectID = req.query.projectID;
        console.log("getting project info on project ID", projectID);
        pool.query("SELECT P.projectID, P.projectName, G.groupName, P.projectStatus, P.startTime, P.endTime FROM projects P, groups G WHERE P.groupID=G.groupID and P.projectID=$1;", [projectID])
            .then(function (response) {
                return res.status(200).json({rows: response.rows});
            })
            .catch(function (error) {
                console.log(error);
                return res.sendStatus(500);
            });
    });

    // Edit project info - change Info
    app.put("/updateProjectInfo", function (req, res) {
        let body = req.body;
        console.log("body", body);
        pool.query("UPDATE Projects SET projectName = $1, projectStatus=$2, startTime=$3, endTime=$4 WHERE projectID=$5;", [body.name, body.status, body.start, body.end, body.projectID])
            .then(function (response) {
                console.log(response.rows);
                return res.status(200).json({rows: response.rows});
            })
            .catch(function (error) {
                console.log(error);
                return res.sendStatus(500);
            });
    });



    app.delete("/deleteProject", function (req, res) {
        let projectID = req.query.projectID;
        console.log(projectID, "going to delete");

        // delete from Projects table, UserProjects table, Tasks table
        pool.query("DELETE FROM userProjects WHERE projectid=$1;", [projectID])
            .then(function (response) {
                console.log("delete from userProjects");
            })
            .catch(function (error) {
                console.log(error);
            });
        pool.query("DELETE FROM Tasks WHERE projectid=$1;", [projectID])
            .then(function (response) {
                console.log("delete from Tasks");
            })
            .catch(function (error) {
                console.log(error);
            });
        pool.query("DELETE FROM Projects WHERE projectid=$1;", [projectID])
            .then(function (response) {
                console.log("delete from Projects");
                return res.sendStatus(200);
            })
            .catch(function (error) {
                console.log(error);
                return res.sendStatus(500);
            });
    });
}