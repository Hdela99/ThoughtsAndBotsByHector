const {Thoughts, User} = require('../models');

module.exports = {

    // Find all thoughts
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.status(200).json(thoughts))
            .catch(err => res.status(500).json(err))
    },

    // Get single thought
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
            .select()
            .lean()
            .then(thought =>{
                if (!thought) {
                    res.status(404).json({message: "No thoughts head empty!"})
                } else{
                    res.json(thought);
                }
            }).catch((err) => res.status(500).json(err))
    },

    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user =>{
                if(!user) {
                    res.status(404).json({message: "Thought created but user not found?"})
                } else{
                    res.status(200).json('You have thoughts!');
                }
            })).catch((err) => res.status(500).json(err))
    },
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((thought) => {
            if (!thought) {
                res.status(404).json({message: "Updating broken no thoughts available!"})
            } else{
                res.json(thought)
            }})
    },

    // DELETE route for deleting thoughts
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
            .then(() => res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    // ADD reactions to thought
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        ).then((thought) =>
        {
            if (!thought) {
                res.status(404).json({message: "No thoughts with that ID!"})
            } else{
                res.json(thought)
            }}).catch((err) => res.status(404).json(err))
    },

    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        ).then((thought) =>
        {
            if (!thought) {
                res.status(404).json({message: "No thoughts with that ID!"})
            } else{
                res.json(thought)
            }}).catch((err) => res.status(404).json(err))
    },



}




