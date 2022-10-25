const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true,
            trim: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Use a real email bro.'],
                trim: true,
            },
        thoughts: [
            [
                {
                    type: mongoose.Schema.Types.ObjectId,
                     ref: 'Thoughts'
                }
            ]
        ],
        friends:[ {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

userSchema.virtual('friendCount')
.get(function()  {
    return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;