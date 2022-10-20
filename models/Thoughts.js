const {Schema, model} = require('mongoose');
const {User} = require('./User.js');

const thoughtsSchema = new Schema(
    {
        creationDate: {
            type: Date,
            default: Date.now,
        },
        title: {
            Type: String, 
            required: true
        },
        content: {
            Type: String, 
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        meta: {
            likes: Number,
            comments: Number,
            downvotes: Number,
            reports: Number,
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtsSchema
.virtual('likeCount')
.get(function() {
    return this.meta.likes;
});

thoughtsSchema
.virtual('commentCount')
.get(function() {
    return this.meta.comments;
});

thoughtsSchema
.virtual('downvoteCount')
.get(function() {
    return this.meta.downvotes;
});

thoughtsSchema
.virtual('reportCount')
.get(function() {
    return this.meta.reports;
});

const Thoughts = model('thoughts', thoughtsSchema);
module.exports = Thoughts;