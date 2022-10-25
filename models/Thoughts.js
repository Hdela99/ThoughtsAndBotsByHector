const mongoose = require('mongoose');
const reactionSchema = require('./Reactions.js');

var tunedDate = function (date) {
    return date.toLocaleString()
};


const thoughtsSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String, 
            minLength: 1,
            maxLength: 300,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: tunedDate
        },

        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    });

    thoughtsSchema
    .virtual('reactionCount').get(function() {
        return this.reactions.length;
    });

const Thoughts = mongoose.model('Thoughts', thoughtsSchema);
module.exports = Thoughts;