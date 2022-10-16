const User = require('../models/User.js');

module.exports = {
    getUsers(req, res) {
        User.find().then((users) => {
            res.json(users)
        }).catch((err) => {
            res.status(500).json(err);
        })
    },
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId })
        .select('-__v').then((user => {
            if(!user) {
                res.status(404).json({message: "No user with that ID"})
            } else{
                res.json(user);
            }
        }).catch((err) => res.status(500).json(err))
        )
    },
    createUser(req, res) {
        User.create(req.body).then((dbUserData) => res.json(dbUserData)).catch((err) => res.status(500).json(err))
    },
    updateUser(req, res) {//how do i implement this?
        User.updateOne(req.body).then((dbUserData))
    },
    deleteUser(req, res) {
        User.deleteOne({_id: req.params.userId})
        .select('-__v').then((user => {
            if(!user) {
                res.status(404).json({message: "no user with that ID"})
            } else{
                
            }
        }))
    }
}