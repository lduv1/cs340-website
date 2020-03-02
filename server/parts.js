module.exports = function(){
    var express = require('express');
    const url = require('url');
    const querystring = require('querystring');

    var router = express.Router();

    function getParts(req, res, mysql, context, complete){

        let parsedQs = querystring.parse(url.parse(req.url).query);
        console.log(parsedQs)

        const value = parsedQs.value;
        const column = parsedQs.column;
        const letters = /^[0-9A-Za-z_]+$/;

        var query = "SELECT * from Parts";

        if (value && column && value.match(letters) && column.match(letters)){
            query += ` WHERE ${column}='${value}'`
        }
        console.log(query);

        mysql.pool.query(query, function(error, results, fields){
            console.log(results);
            console.log(results.length);
            if(error || results.length == 0){
                console.log("error results");
                context.Parts = [{error: "error", reason: "do empty search to clear"}];
            }
            else {
                context.Parts = results;
            }
            complete();
            
        });
    }

    // function getPartsbyHomeworld(req, res, mysql, context, complete){
    //   var query = "SELECT bsg_Parts.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_Parts INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_Parts.homeworld = ?";
    //   console.log(req.params)
    //   var inserts = [req.params.homeworld]
    //   mysql.pool.query(query, inserts, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.Parts = results;
    //         complete();
    //     });
    // }

    // /* Find Parts whose fname starts with a given string in the req */
    // function getPartsWithNameLike(req, res, mysql, context, complete) {
    //   //sanitize the input as well as include the % character
    //    var query = "SELECT bsg_Parts.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_Parts INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_Parts.fname LIKE " + mysql.pool.escape(req.params.s + '%');
    //   console.log(query)

    //   mysql.pool.query(query, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.Parts = results;
    //         complete();
    //     });
    // }

    // function getPerson(res, mysql, context, id, complete){
    //     var sql = "SELECT character_id as id, fname, lname, homeworld, age FROM bsg_Parts WHERE character_id = ?";
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

    /*Display all Parts. Requires web based javascript to delete Parts with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getParts(req, res, mysql, context, complete);
        function complete(){
            res.json({
                results: context.Parts
            });
        }
    });

    // /*Display all Parts from a given homeworld. Requires web based javascript to delete Parts with AJAX*/
    // router.get('/filter/:homeworld', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["deleteperson.js","filterParts.js","searchParts.js"];
    //     var mysql = req.app.get('mysql');
    //     getPartsbyHomeworld(req,res, mysql, context, complete);
    //     getPlanets(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('Parts', context);
    //         }

    //     }
    // });

    // /*Display all Parts whose name starts with a given string. Requires web based javascript to delete Parts with AJAX */
    // router.get('/search/:s', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["deleteperson.js","filterParts.js","searchParts.js"];
    //     var mysql = req.app.get('mysql');
    //     getPartsWithNameLike(req, res, mysql, context, complete);
    //     getPlanets(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('Parts', context);
    //         }
    //     }
    // });

    // /* Display one person for the specific purpose of updating Parts */

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

    // /* Adds a person, redirects to the Parts page after adding */

    router.post('/', function(req, res){
        console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Parts (partID, partType, price, specs) VALUES (NULL,?,?,?)";
        var inserts = [req.body.partType, req.body.price, req.body.specs];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/parts');
            }
        });
    });

    // /* The URI that update data is sent to in order to update a person */

    // router.put('/:id', function(req, res){
    //     var mysql = req.app.get('mysql');
    //     console.log(req.body)
    //     console.log(req.params.id)
    //     var sql = "UPDATE bsg_Parts SET fname=?, lname=?, homeworld=?, age=? WHERE character_id=?";
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
    //     var sql = "DELETE FROM bsg_Parts WHERE character_id = ?";
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
