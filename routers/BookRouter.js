const BaseRouter = require('./BaseRouter');
const BookModel = require('../models/BookModel');
const ChapterModel = require('../models/ChapterModel');
const BookController = require('../controllers/BookController');

class BookRouter extends BaseRouter {

    constructor() {
        super();
    }

    moduleExport() {
        module.exports = this.router;
    }

    loadModules() {
        super.loadModules();
        this.bookController = new BookController();
    }

    loadRoutes() {
        this.loadBookListRoute();
        this.loadBookRoute();
    }

    async loadBookListRoute() {
        this.router.get('/list', async(req,res)=>{
            try {

                let books = await this.bookController.loadAllBooks();

                // rendering the index page as book list
                res.render('book/list', {
                    books : books,
                });

            } catch (e){
                console.log(e)
            }

        })
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
                res.render('book/view', {
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