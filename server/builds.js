module.exports = function(){
    var express = require('express');
    const url = require('url');
    const querystring = require('querystring');

    var router = express.Router();

    function getBuilds(req, res, mysql, context, complete){

        let parsedQs = querystring.parse(url.parse(req.url).query);
        console.log(parsedQs)

        const value = parsedQs.value;
        const column = parsedQs.column;
        const letters = /^[0-9A-Za-z_]+$/;

        var query = "SELECT * from Builds";

        if (value && column && value.match(letters) && column.match(letters)){
            query += ` WHERE ${column}='${value}'`
        }
        console.log(query);

        mysql.pool.query(query, function(error, results, fields){
            console.log(results);
            console.log(results.length);
            if(error || results.length == 0){
                console.log("error results");
                context.Builds = [{error: "error", reason: "do empty search to clear"}];
            }
            else {
                context.Builds = results;
            }
            complete();
            
        });
    }
    function getBuildsParts(req, res, mysql, context, complete){

        var query = "SELECT * from Builds_Parts";

        mysql.pool.query(query, function(error, results, fields){
            console.log(results);
            console.log(results.length);
            if(error || results.length == 0){
                console.log("error results");
                context.BuildsParts = [{error: "error", reason: "do empty search to clear"}];
            }
            else {
                context.BuildsParts = results;
            }
            complete();
            
        });
    }

    // function getBuildsbyHomeworld(req, res, mysql, context, complete){
    //   var query = "SELECT bsg_Builds.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_Builds INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_Builds.homeworld = ?";
    //   console.log(req.params)
    //   var inserts = [req.params.homeworld]
    //   mysql.pool.query(query, inserts, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.Builds = results;
    //         complete();
    //     });
    // }

    // /* Find Builds whose fname starts with a given string in the req */
    // function getBuildsWithNameLike(req, res, mysql, context, complete) {
    //   //sanitize the input as well as include the % character
    //    var query = "SELECT bsg_Builds.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_Builds INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_Builds.fname LIKE " + mysql.pool.escape(req.params.s + '%');
    //   console.log(query)

    //   mysql.pool.query(query, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.Builds = results;
    //         complete();
    //     });
    // }

    // function getPerson(res, mysql, context, id, complete){
    //     var sql = "SELECT character_id as id, fname, lname, homeworld, age FROM bsg_Builds WHERE character_id = ?";
    //     var inserts = [id];
    //     mysql.pool.query(sql, inserts, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.person = results[0];
    //         complete();
    //     });
    // }

    /*Display all Builds. Requires web based javascript to delete Builds with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getBuilds(req, res, mysql, context, complete);
        getBuildsParts(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            console.log("complete called")
            if (callbackCount == 2){
                console.log("returning")
                res.json({
                    results: context.Builds,
                    buildsParts: context.BuildsParts
                });
            }
        }
    });

    // /*Display all Builds from a given homeworld. Requires web based javascript to delete Builds with AJAX*/
    // router.get('/filter/:homeworld', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["deleteperson.js","filterBuilds.js","searchBuilds.js"];
    //     var mysql = req.app.get('mysql');
    //     getBuildsbyHomeworld(req,res, mysql, context, complete);
    //     getPlanets(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('Builds', context);
    //         }

    //     }
    // });

    // /*Display all Builds whose name starts with a given string. Requires web based javascript to delete Builds with AJAX */
    // router.get('/search/:s', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["deleteperson.js","filterBuilds.js","searchBuilds.js"];
    //     var mysql = req.app.get('mysql');
    //     getBuildsWithNameLike(req, res, mysql, context, complete);
    //     getPlanets(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('Builds', context);
    //         }
    //     }
    // });

    // /* Display one person for the specific purpose of updating Builds */

    // router.get('/:id', function(req, res){
    //     callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["selectedplanet.js", "updateperson.js"];
    //     var mysql = req.app.get('mysql');
    //     getPerson(res, mysql, context, req.params.id, complete);
    //     getPlanets(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('update-person', context);
    //         }

    //     }
    // });

    // /* Adds a person, redirects to the Builds page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Builds (buildID, userID) VALUES (NULL,?)";
        var inserts = [req.body.userID];
        console.log(sql)
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/builds');
            }
        });
    });
    router.post('/parts', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Builds_Parts (buildID, partID) VALUES (?,?)";
        var inserts = [req.body.buildID,req.body.partID];
        console.log(sql)
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/builds');
            }
        });
    });

    // /* The URI that update data is sent to in order to update a person */

    // router.put('/:id', function(req, res){
    //     var mysql = req.app.get('mysql');
    //     console.log(req.body)
    //     console.log(req.params.id)
    //     var sql = "UPDATE bsg_Builds SET fname=?, lname=?, homeworld=?, age=? WHERE character_id=?";
    //     var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age, req.params.id];
    //     sql = mysql.pool.query(sql,inserts,function(error, results, fields){
    //         if(error){
    //             console.log(error)
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }else{
    //             res.status(200);
    //             res.end();
    //         }
    //     });
    // });

    // /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    // router.delete('/:id', function(req, res){
    //     var mysql = req.app.get('mysql');
    //     var sql = "DELETE FROM bsg_Builds WHERE character_id = ?";
    //     var inserts = [req.params.id];
    //     sql = mysql.pool.query(sql, inserts, function(error, results, fields){
    //         if(error){
    //             console.log(error)
    //             res.write(JSON.stringify(error));
    //             res.status(400);
    //             res.end();
    //         }else{
    //             res.status(202).end();
    //         }
    //     })
    // })

    return router;
}();
