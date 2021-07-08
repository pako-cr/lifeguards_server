const { Schema, model } = require('mongoose');

const ReportSchema = Schema({
    name: {
        type: String,
        required: true
    },
})

ReportSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.uid = _id
    return object
})

module.exports = model('Report', ReportSchema);