module.exports = function(app){
    //hi
    app.get ('/', function (req, res)
    {
        //set up and export homepage route to server
        res.render('homepage.html');
    });

    app.get ('/aboutpage', function (req, res)
    {
        //set up and export aboutpage route to server
        res.render('aboutpage.html');
    });

     app.get("/listfoodpage", function(req, res) {
        //query database to get all the foods
        let sqlquery = "SELECT * FROM food";
        //execute sql query
        db.query(sqlquery, (err, result) => {
        if (err) {
            //catch errors
            res.redirect("/");
        }
        //set up and export listfoodpage while using results from database
        res.render("listfoodpage.html",{available:result});
        });
    });

    app.get ('/searchfoodpage', function (req, res)
    {
        //set up and export searchfoodpage route to server
        res.render('searchfoodpage.html');
    });
    
    app.get ('/searchfoodpage-result', function (req, res)
    {
        //searching in the database using keyword
        let word = [req.query.keyword];
        let sqlquery = "SELECT * FROM food WHERE name like '%" +word+"%'";;

        //execute sql query
        db.query(sqlquery,word, (err, result) => {
            if (err || result == "") {
                //if keyword cannot be found in database
                res.send('The food cannot be found.'); 
                return console.error("No food found with the keyword you have entered" + req.query.keyword + "error: "+ err.message);
            }else{
                //show result of the search using an ejs template file, list.ejs can be used here
                res.render('listfoodpage.html',{available:result});
            }
        }); 
    });

    app.get ('/addfoodpage', function (req, res)
    {
        //set up and export addfoodpage route to server
        res.render('addfoodpage.html');
    });

    app.post("/addfoodpage", function (req,res) {
        //input data from form to database
        let sqlquery = "INSERT INTO food (name, typicalValue, unitOfTypicalValue, calories, carbs, fats, protein, salt, sugar) VALUES (?,?,?,?,?,?,?,?,?)";
        let newrecord = [req.body.name, 
            req.body.typicalValue, 
            req.body.unitOfTypicalValue, 
            req.body.calories, 
            req.body.carbs, 
            req.body.fats, 
            req.body.protein, 
            req.body.salt,
            req.body.sugar]; 
        //execute sql query
        db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            //catch errors
            return console.error(err.message);
        }else
           res.send('The food is added.'); 
        }); 
    })

    app.get ('/updatefoodpage', function (req, res)
    {
        //set up and export updatefoodpage route to server
        res.render('updatefoodpage.html');
    });

    app.get ('/updatefoodpage-result', function (req, res)
    {
        //searching in the database using keyword
        let word = [req.query.keyword];
        let sqlquery = "SELECT * FROM food WHERE name like '%" +word+"%'";;

        //execute sql query
        db.query(sqlquery,word, (err, result) => {
            if (err || result == "") {
                //if keyword cannot be found in database
                res.send('The food cannot be found.'); 
                return console.error("No food found with the keyword you have entered" + req.query.keyword + "error: "+ err.message);
            }else{
                //show result of the search using an ejs template file, list.ejs can be used here
                res.render ('updatefoodpage-update.html',{available:result});
            }
        }); 
    });

    app.post("/updatefoodpage-update", function (req,res) {
        //input data from form to database
        let sqlquery= "UPDATE food SET name = ?, typicalValue = ?, unitOfTypicalValue = ?, calories = ?, carbs = ?, fats = ?, protein = ?, salt = ?, sugar = ? where id = ?";
        let newrecord = [req.body.name,
            req.body.typicalValue,
            req.body.unitOfTypicalValue,
            req.body.calories,
            req.body.carbs,
            req.body.fats,
            req.body.protein,
            req.body.salt,
            req.body.sugar,
            req.body.id]; 
        //execute sql query
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                //catch errors
                return console.error(err.message);
            }else{
                res.send('The food is updated.');
            }
        });
    });

    app.get ('/deletefoodpage', function (req, res)
    {
        //set up and export deletefoodpage route to server
        res.render('deletefoodpage.html');
    });

    app.get('/deletefoodpage-result',function(req,res){
        //searching in the database using keyword
        let word = [req.query.keyword];
        let sqlquery = "SELECT * FROM food WHERE name like '%" +word+"%'";

        //execute sql query
        db.query(sqlquery,word, (err, result) => {
            if (err || result == "") {
                //if keyword cannot be found in database
                res.send('The food cannot be found.'); 
                return console.error("No food found with the keyword you have entered" + req.query.keyword + "error: "+ err.message);
            }else{
                //show result of the search using an ejs template file, list.ejs can be used here                
                res.render('deletefoodpage-delete.html',{available:result});
            }
        }); 
    });

    app.post('/deletefoodpage',function(req,res){
        //delete record by matching id to user input
        let sqlquery = "DELETE FROM food WHERE id = ? ";
        let id = [req.body.id];
        //execute sql query
        db.query(sqlquery,id, (err, result) => {
            if (err || result == "") {
                //catch errors
                res.send('The food cannot be deleted.'); 
                return console.error("No food found with the keyword you have entered" + req.query.keyword + "error: "+ err.message); 
            }else{
                res.send("The food is deleted");
            }
        }); 
    });
}
