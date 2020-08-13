const mongoose = require('mongoose')

const chapterSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    markdown : {
        type : String,
    },
    updateDate : {
        type: Date,
        required: true,
        default: Date.now
    },
    book: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'Book'
    }
})

// Creating a virtual property
chapterSchema.virtual('getDate').get(function(){
    if (this.updateDate != null){
        return this.updateDate.toISOString().split('T');
    }

    return '';
})

module.exports = mongoose.model('Chapter', chapterSchema)