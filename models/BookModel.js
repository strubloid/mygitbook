var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    }
});

bookSchema.methods.getName = function () {
    return this.name.match(/(.*)(?=\.)/g)[0];
}


bookSchema.methods.getBookReference = function () {
    return `/book/${this.name}`;
}

module.exports = mongoose.model('Books', bookSchema)