const Thoughts = require('../models/Thoughts.js');
const User = require('../models/User.js');

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((users) => {res.json(users)})
        .catch((err) => {res.status(500).json(err)});
    },
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId })
        .select()
        .lean()
        .then((user => {
            if(!user) {
                res.status(404).json({message: "No user with that ID"})
            } else{
                res.json(user);
            }
        })).catch((err) => res.status(500).json(err))
    },
    createUser(req, res) {
        User.create(req.body)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(err));
    },
    updateUser(req, res) {//how do i implement this?
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $set: req.body}, 
            {runValidators: true, new: true},
        ).then((user) => {
            if(!user) {
                res.status(404).json({message: "Error during updating due to no user with that ID.. hopefully"})
            } else{
                res.json(user);
            }})
    },
    deleteUser(req, res) {
        User.findOneAndDelete(
            {_id: req.params.userId},
        ).then((user) => {
            if(!user) {
                res.status(404).json({message: "Error during deletion due to no user with that ID.. hopefully"})
            } else{
                Thoughts.deleteMany({_id: {$in: user.thoughts }})
            }}).then(() => {
                res.json({message: 'User deletion complete!'})})
                .catch((err) => {res.status(500).json(err)})
    },

    newFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: { friends: req.params.friendId }},
            {runValidators: true, new: true}
        ).then((user => {
            if(!user) {
                res.status(404).json({message: "No user with that ID"})
            } else{
                res.json(user);
            }
        })).catch((err) => res.status(404).json(err))
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId },
            {$pull: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        ).then((user => {
            if(!user) {
                res.status(404).json({message: "No user with that ID"})
            } else{
                res.json(user);
            }
        })).catch((err) => res.status(404).json(err))
    }
}