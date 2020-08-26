let BaseRouter = require('./BaseRouter');
const BookModel = require('../models/BookModel');
const ChapterModel = require('../models/ChapterModel');

class BookRouter extends BaseRouter {

    constructor() {
        super();
    }

    moduleExport() {
        module.exports = this.router;
    }

    loadModules() {
        super.loadModules();
    }

    loadRoutes() {
        this.loadBookRoute();
    }

    async loadBookRoute() {
        this.router.get('/:name', async(req,res)=>{
            try {

                let searchOptions = {}

                if (req.params.name != null && req.params.name !== '') {
                    searchOptions.name = new RegExp(req.params.name, 'i')
                }

                // Load the book data
                let book = await BookModel.findOne(searchOptions);

                // Loading the chapters of this book
                let chapters = await ChapterModel.find({
                    'book' : book.id
                });

                // rendering the index page as book list
                res.render('book/list', {
                    book : book,
                    chapters : chapters,
                });

            } catch (e){
                console.log(e)
            }

        })
    }

}

let bookRouter = new BookRouter();