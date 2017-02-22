var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('../config/main');

var User = require('../models/user');

// signup 
router.post('/signup', function(req, res, next) {
   req.checkBody('userName', 'Username is required').notEmpty();
   req.checkBody('password', 'Password is required').notEmpty();
   req.checkBody('email', 'Email is required').notEmpty();

   req.getValidationResult().then(function(result) {
        var errors = result.array();

        if(errors.length) {
             return res.status(500).json({
                message: 'An error occured',
                error: errors
            });
        }

        var user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
        });

        user.save(function(err, result) {
            if(err) {
                return res.status(500).json({
                    message: 'An error occured',
                    error: err
                });
            }

            return res.status(201).json({
                message: 'User created',
                user: result
            });
        });
   });
});

// authenticate the user and get jwt
router.post('/authenticate', function(req, res, next) {
    User.findOne({userName: req.body.userName}, function(err, user) {
        if(err) {
            return res.status(500).json({
                message: 'An error occured',
                error: err
            });
        }

        if(!user) {
            return res.status(500).json({
                message: 'Authentication failed',
                error: err
            });
        } else {
            // check if passwords match
            user.comparePassword(req.body.password, function(err, isMatch) {
                if(isMatch && !err) {
                    // create token
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 2592000 // 1 month in seconds 
                    });

                    return res.status(200).json({
                        message: 'Authentication successful',
                        token: `JWT ${token}`
                    });
                } else {
                    return res.status(500).json({
                        message: 'Authentication failed',
                        error: err
                    });
                }
            });
        }
    });
});

// protect dashboard route with jwt
router.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    res.status(200).json({
        message: 'Authorized',
        userId: req.user._id
    });
});

// delete user
router.delete('/delete/:userId', function(req, res, next) {
    User.findByIdAndRemove(req.params.userId, function(err, user) {
        if(err) {
            return res.status(500).json({
                message: 'An error occured',
                error: err
            });
        }

        if(!user) {
            return res.status(500).json({
                message: 'User not found',
            });
        }

        return res.status(200).json({
                message: 'User successfully deleted',
                userId: user._id
        });
    });   
})

module.exports = router;
