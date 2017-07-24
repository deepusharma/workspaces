var express = require ('express')
var router = express.Router();

var mongojs = require('mongojs');
var db =  mongojs ('mongodb://deepak:deepak@ds161890.mlab.com:61890/meantodos_deepak_dev', ['todos']);

// Get  TODOS 
router.get ('/todos', function (req, res, next){
    db.todos.find (function (err, todos ){
        if (err) {
            res.send (err);    
        } else {
            res.json (todos);
        }
    });    
});


// Get Single Todo 
router.get ('/todo/:id', function (req, res, next){
    db.todos.findOne ({
      _id: mongojs.ObjectId (req.params.id)  
    }, function (err, todo){
        if (err) {
            res.send (err);    
        } else {
            res.json (todo);
        }
    });
});



//Save TODO
router.post ('/todo', function (req, res, next){

    var todo = req.body;
    if ( !todo.text || !(todo.isCompleted+'')) {
        res.status (400);
        res.json ({
            "error": "Invalid Data"
        });
    } else {

    }

    db.save (todo, function (err, result){
        if (err) {
            res.send (err);    
        } else {
            res.json (result);
        }
    });
});


//Update TODO
router.put ('/todo/:id', function (req, res, next){

    var todo = req.body;
    var updObj = {};


    if ( todo.isCompleted) {
        updObj.isCompleted = todo.isCompleted;
    }

    if ( todo.text) {
        updObj.text = todo.text;
    }
    
    if (!updObj) {
        res.status (400);
        res.json ({
            "error": "Invalid Data"
        });
    } else {
        db.todos.update ({
            _id: mongojs.ObjectId (req.params.id)
        }, updObj, {}, function (err,result) {
            if (err) {
                res.send (err);    
            } else {
                res.json (result);
            }        
        });
    }

});



//Delete TODO
router.delete ('/todo/:id', function (req, res, next){
    
    db.todos.remove ({
        _id: mongojs.ObjectId (req.params.id)
    }, '', function (err,result) {
        if (err) {
            res.send (err);    
        } else {
            res.json (result);
        }        
    });

});


// Export the router 
module.exports = router;
