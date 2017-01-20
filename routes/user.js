var _ = require('lodash');
var User = require('../models/user.js');

module.exports = function(app) {

    /* Make a User */
    app.post('/user', function(req, res){
        var newUser = new User(req.body);
        newUser.save(function(err){
            if(err){
                res.json({info: 'error during user create', error:err});
            };
            res.json({info: 'user created successfully'});
        });
    });

    /* Find Users */
    app.get('/user', function(req, res){
        User.find(function(err, users){
            if(err){
                res.json({info: 'erro when looking for users', error:err});
            };
            res.json({info:'users found successfully'});
        });
    });
    
    app.get('/user/:id', function(req, res){
        User.findById(req.params.id, function(err, user){
            if (err){
                res.json({info: 'error looking for this user', error:err});
            };
            if (user) {
                res.json({info: 'user found successfully', data:user});
            } else {
                res.json({info: 'User isnt here man'});
            }
        });
    });

    /* Update User */
    app.put('/user/:id', function(req, res){
        User.findById(req.params.id, function(err, user) {
            if(err){
                res.json({info: 'error finding this user', error:err});
            }
            if(user){
                _.merge(user, req.body);
                user.save(function(err){
                    if(err){
                        res.json({info: 'error during user update', error:err});
                    }
                    res.json({info: 'user updated successfully'});
                });
                
            } else {
                res.json({info: 'user not found'});
            }

        });
    });
        app.delete('/user/:id', function (req, res) {
        User.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove user', error: err});
            };
            res.json({info: 'user removed successfully'});
        });
    });
}