var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , Showdown = require('showdown');

const chapterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Books'
    }
});


chapterSchema.methods.getName = function () {
    return this.name.match(/(.*)(?=\.)/g)[0];
}

chapterSchema.methods.getMarkdown = function () {

    converter = new Showdown.Converter();
    html = converter.makeHtml(this.content);

    return html;
}

module.exports = mongoose.model('Chapter', chapterSchema)