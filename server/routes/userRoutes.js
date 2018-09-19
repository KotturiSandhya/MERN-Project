const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

router.post('/register', function(req, res){
    const {errors, isValid } = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user){
            return res.status(400).json({
                email: 'Email already exists'
        })
        }else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            });
            console.log(newUser);
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json();
                                }); 
                        }
                    });
                }
            });
               
        }
    })
})


router.post('/login', (req,res)=>{

    const { errors, isValid } = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email=req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(
        user=>{
            if(!user){
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password).then(
                isMatch => {
                    if(isMatch){
                        const payload={
                            id: user.id,
                            name: user.name
                        }
                        jwt.sign(payload, 'secret', { expiresIn: 3600},(err, token) => {
                            if(err) console.error("There is some error in token", err);
                            else{
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`,
                                    user: {
                                        name: user.name,
                                        email: user.email,
                                        role: user.role
                                    }
                                });
                            }
                        })
                    }else{
                        errors.password = "Incorrect Password";
                        return res.status(400).json(errors);
                    }
                }
            )
            // else{
            //     if(user.email !== email){
            //         errors.email = 'Invalid Email'
            //         return res.status(400).json(errors);
            //     }else if(user.password !== password){
            //             errors.password = 'Invalid Password'
            //             return res.status(400).json(errors);
            //     }else{
            //         return res.status(200).json(user);
            //     }
            // }
        }
    );
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

router.get('/usersList', (req,res)=>{
        User.find().then(list=>{
            return res.status(200).json(list);
        })
});
router.post('/updateUser', (req, res)=>{
    const _id = req.body._id;
    User.findOne({_id}).then(
        user=>{
            user.name = req.body.name,
            user.email = req.body.email,
            user.role = req.body.role
            user.save().then((u)=>{
                return res.json(u);
            })
        }
    )
})

router.post('/removeUser', (req, res) => {
    User.remove({_id: req.body._id}, (err)=>{
        if(!err)
            res.json("Successfully Removed");
        else
            res.json("Not Done");
    })
});

module.exports = router;