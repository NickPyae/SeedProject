let express = require('express');
let router = express.Router();

let User = require('../models/user');

router.post('/signup', (req, res, next) => {
   req.checkBody('userName', 'Username is required').notEmpty();
   req.checkBody('password', 'Password is required').notEmpty();

   req.getValidationResult().then((result) => {
        let errors = result.array();

        if(errors.length) {
             return res.status(500).json({
                message: 'An error occured',
                error: errors
            });
        }

        let user = new User({
            userName: req.body.userName,
            password: req.body.password
        });

        user.save((err, result) => {
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

module.exports = router;
