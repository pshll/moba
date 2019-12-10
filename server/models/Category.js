const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type: String},
    parent: {type: mongoose.SchemaTypes.ObjectID, ref: 'Category'}
})

module.exports = mongoose.model('Category', schema)