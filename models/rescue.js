const { Schema, model } = require('mongoose');

const RescueSchema = Schema({
    date: {
        type: Date,
        default: Date.now
    },
    identification: String,
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    dead: {
        type: Boolean,
        required: true
    },
    lifeguard: {
        type: String,
        required: true
    }
})

RescueSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    return object
})

module.exports = model('Rescue', RescueSchema);