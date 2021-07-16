const { Schema, model } = require('mongoose');

const PreventionSchema = Schema({
    date: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        required: true
    },
    nationality: {
        type: String,
    },
    lifeguard: {
        type: String,
        required: true
    }
})

PreventionSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    return object
})

module.exports = model('Prevention', PreventionSchema);