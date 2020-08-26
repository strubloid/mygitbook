const GithubModel = require('../models/GithubModel');
const BookModel = require('../models/BookModel');
const ChapterModel = require('../models/ChapterModel');

class BookController {

    // This will construct this controller class
    constructor() {
        this.collection = [];
    }

    /**
     * Loads all books Stored in the Book Table.
     *
     * @returns {Promise<any>}
     */
    async loadAllBooks()
    {
        let books = await BookModel.find({});
        this.collection = books;

        return books;
    }
}

module.exports = BookController;