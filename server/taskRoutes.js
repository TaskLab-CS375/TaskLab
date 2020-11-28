module.exports = function(app, pool) {


    app.post("/addTask", function (req, res) {
        let body = req.body;
        // console.log(body.start, body.end);
        
        // // Update table projects, userprojects
        // pool.query(
        //     "INSERT INTO Tasks (projectid, taskname, taskdescription, percentcomplete) VALUES($1, $2, $3, $4);",
        //     [body.projectid, body.name, body.description, body.percentcomplete]
        // )
        //     .then(function (response) {
        //         console.log("first insert", response.rows);
        //     });
        // pool.query("SELECT taskName, taskDescription, percentComplete, startTime, endTime FROM Tasks WHERE projectID=$1;", [projectID])
        //     .then(function (response) {
        //         console.log(response.rows);
        //         return res.status(200).json({rows: response.rows});
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         return res.sendStatus(500);
        //     });
    });

    app.get("/getTask", function (req, res) {
        let userEmail = req.query.userID;
        let projectID=1;
        console.log(userEmail);
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
}