const UserModel = require('../models/Users');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

var userCreate = function (req, res) {
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    };
    UserModel.findOne({
        where: {
            email: req.body.email
        }
    }).then(result => {
        if (result == null) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash;
                UserModel.create(userData).then(regResult => {
                    res.json({ status: 'Registered Successfully' });
                }).catch(err => {
                    res.json('error ' + err);
                })
            })
        } else {
            res.json({ error: 'Email Already exists' });
        }
    }).catch(err => {
        res.json('error ' + err);
    })
};

var getUsers = function (req, res) {
    UserModel.findAll({}).then(result => {
        res.json({ result })
    }).catch(err => {
        res.json('error ' + err);
    })
};

var loginUser = function (req, res) {
    var loginData = {
        email: req.body.email,
        password: req.body.password
    }

    UserModel.findOne({
        where: {
            email: req.body.email
        }
    }).then(result => {
        if (result) {
            var userData = {
                idusers: result.idusers,
                first_name: result.first_name,
                last_name: result.last_name,
                email: result.email,
            }

            if (bcrypt.compareSync(req.body.password, result.password)) {
                let jwToken = jwt.sign(userData, process.env.SECRET_KEY, {
                    expiresIn: 1440
                });
                res.status(200).json({
                    success: true,
                    token: jwToken
                });
            } else {
                res.json({ status: "Password Incorrect" })
            }
        } else {
            res.json({ status: "Email not found" })
        }
    })
}

var updateUser = function (req, res) {
    // const userData = {
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     password: req.body.password
    // };
    var token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send({ auth: false, message: 'No token provided.' });
    } else {
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            if (decoded) {
                if (req.body.Password && req.body.password != decoded.password) {
                    bcrypt.hash(req.body.Password, 10, (err, hash) => {
                        const userData = {
                            first_name: req.body.first_name ? req.body.first_name : decoded.first_name,
                            last_name: req.body.last_name ? req.body.last_name : decoded.last_name,
                            email: req.body.email ? req.body.email : decoded.email,
                            password: hash
                        };
                        UserModel.update(userData, {
                            where: {
                                idusers: decoded.idusers
                            }
                        }).then(resp => {
                            res.json({ status: "Updated Succesfully" });
                        }).catch(err => {
                            res.json('error' + err)
                        })
                    })
                } else {
                    const userData = {
                        first_name: req.body.first_name ? req.body.first_name : decoded.first_name,
                        last_name: req.body.last_name ? req.body.last_name : decoded.last_name,
                        email: req.body.email ? req.body.email : decoded.email,
                        password: decoded.password
                    };
                    UserModel.update(userData, {
                        where: {
                            idusers: decoded.idusers
                        }
                    }).then(resp => {
                        res.json({ status: "Updated Succesfully" });
                    }).catch(err => {
                        res.json('error' + err)
                    })
                }
            }
        })
    }
}

var deleteUser = function (req, res) {
    var userId = req.params.id;
    UserModel.destroy({
        where: {
            idusers: userId
        }
    }).then(resp => {
        res.json({ status: 'User deleted successfully' });
    }).catch(err => {
        res.json('error' + err);
    })
}

module.exports = {
    userCreate, getUsers, loginUser, updateUser, deleteUser
};