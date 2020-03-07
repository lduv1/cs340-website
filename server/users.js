module.exports = function(){
    var express = require('express');
    const url = require('url');
    const querystring = require('querystring');

    var router = express.Router();

    function getUsers(req, res, mysql, context, complete){

        let parsedQs = querystring.parse(url.parse(req.url).query);

        const value = parsedQs.value;
        const column = parsedQs.column;
        const letters = /^[0-9A-Za-z_]+$/;

        var query = "SELECT * from Users";

        if (value && column && value.match(letters) && column.match(letters)){
            query += ` WHERE ${column}='${value}'`
        }
        // console.log(query);

        mysql.pool.query(query, function(error, results, fields){
            if(error || results.length == 0){
                console.log("error results");
                context.Users = [{error: "error", reason: "do empty search to clear"}];
            }
            else {
                context.Users = results;
            }
            complete();
            
        });
    }

    // function getUsersbyHomeworld(req, res, mysql, context, complete){
    //   var query = "SELECT bsg_Users.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_Users INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_Users.homeworld = ?";
    //   console.log(req.params)
    //   var inserts = [req.params.homeworld]
    //   mysql.pool.query(query, inserts, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.Users = results;
    //         complete();
    //     });
    // }

    // /* Find Users whose fname starts with a given string in the req */
    // function getUsersWithNameLike(req, res, mysql, context, complete) {
    //   //sanitize the input as well as include the % character
    //    var query = "SELECT bsg_Users.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_Users INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_Users.fname LIKE " + mysql.pool.escape(req.params.s + '%');
    //   console.log(query)

    //   mysql.pool.query(query, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.Users = results;
    //         complete();
    //     });
    // }

    // function getPerson(res, mysql, context, id, complete){
    //     var sql = "SELECT character_id as id, fname, lname, homeworld, age FROM bsg_Users WHERE character_id = ?";
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

    /*Display all Users. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        getUsers(req, res, mysql, context, complete);
        function complete(){
            res.json({
                results: context.Users
            });
        }
    });

    // /*Display all Users from a given homeworld. Requires web based javascript to delete users with AJAX*/
    // router.get('/filter/:homeworld', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["deleteperson.js","filterUsers.js","searchUsers.js"];
    //     var mysql = req.app.get('mysql');
    //     getUsersbyHomeworld(req,res, mysql, context, complete);
    //     getPlanets(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('Users', context);
    //         }

    //     }
    // });

    // /*Display all Users whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    // router.get('/search/:s', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["deleteperson.js","filterUsers.js","searchUsers.js"];
    //     var mysql = req.app.get('mysql');
    //     getUsersWithNameLike(req, res, mysql, context, complete);
    //     getPlanets(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('Users', context);
    //         }
    //     }
    // });

    // /* Display one person for the specific purpose of updating Users */

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

    // /* Adds a person, redirects to the Users page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Users (userID, email, password, first_name, last_name) VALUES (NULL,?,?,?,?)";
        var inserts = [req.body.email, req.body.password, req.body.firstName, req.body.lastName];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/users');
            }
        });
    });

    // /* The URI that update data is sent to in order to update a person */

    // router.put('/:id', function(req, res){
    //     var mysql = req.app.get('mysql');
    //     console.log(req.body)
    //     console.log(req.params.id)
    //     var sql = "UPDATE bsg_Users SET fname=?, lname=?, homeworld=?, age=? WHERE character_id=?";
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

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Users WHERE userID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
