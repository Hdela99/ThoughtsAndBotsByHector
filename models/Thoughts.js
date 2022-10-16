const {Schema, model} = require('mongoose');
const {User} = require('./User.js');

const thoughtsSchema = new Schema(
    {
        title: {Type: String, required: true},
        content: {Type: String, required: true},
        owner: [User.userName]

    }
)