module.exports = function(app, pool) {


    app.post("/addTask", function (req, res) {
        let body = req.body;
        let projectID = req.query.projectID;
        console.log("projectID",projectID);
        
        // // Update table projects, userprojects
        pool.query(
            "INSERT INTO Tasks (projectid, taskname, startTime, endTime, percentcomplete) VALUES($1, $2, $3, $4, $5);",
            [projectID, body.name, body.start, body.end, body.percentComplete]
        )
            .then(function (response) {
                console.log("first insert", response.rows);
            });
        pool.query("SELECT taskID, taskName, percentComplete, startTime, endTime FROM Tasks WHERE projectID=$1;", [projectID])
            .then(function (response) {
                console.log(response.rows);
                return res.status(200).json({rows: response.rows});
            })
            .catch(function (error) {
                console.log(error);
                return res.sendStatus(500);
            });
    });

    app.get("/getTask", function (req, res) {
        let projectID = req.query.projectID;

        pool.query("SELECT taskID, taskName, percentComplete, startTime, endTime FROM Tasks WHERE projectID=$1;", [projectID])
            .then(function (response) {
                console.log(response.rows);
                return res.status(200).json({rows: response.rows});
            })
            .catch(function (error) {
                console.log(error);
                return res.sendStatus(500);
            });
    });

    // app.delete("/deleteProject", function (req, res) {
    //     let taskID = req.query.taskID;
    //     console.log(taskID, "going to delete");

    //     // delete from Projects table, UserProjects table, Tasks table
    //     pool.query("DELETE FROM Tasks WHERE taskid=$1;", [taskID])
    //         .then(function (response) {
    //             console.log("delete from Tasks");
    //             return res.sendStatus(200);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             return res.sendStatus(500);
    //         });
    // });
}