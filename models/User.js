const {Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            Type: String, 
            required: true,
            max_length: 25,
            unique: true,
            Trimmed: true,
            },
            email: {
                Type: String,
                required: true,
                unique: true,
                //Validate Here
            },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts',
            }
        ],
        friends:[ {
            type: Schema.Types.ObjectId,
            ref: 'user'
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

const User = model('user', userSchema);

module.exports = User;