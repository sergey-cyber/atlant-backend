const {Schema, model} = require('mongoose');

const schema = new Schema({
    rate: {type: Number},
    name: {type: String },
    content: {type: String},
    publicationDate: {type: String},  
});

module.exports = model('Review', schema);