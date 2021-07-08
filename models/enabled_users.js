const { Schema, model } = require('mongoose');

const Enabled_UsersSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
})

Enabled_UsersSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.uid = _id
    return object
})

module.exports = model('Enabled_Users', Enabled_UsersSchema);