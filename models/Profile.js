const { Schema, model } = require('mongoose')
const thoughtsSchema = require('./Thoughts')

const profileSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

profileSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length
    });
    
const User = model('user', profileSchema)