const BaseRouter = require('./BaseRouter');
const BookController = require('../controllers/BookController');
const IndexController = require('../controllers/IndexController');

class IndexRouter extends BaseRouter {

    constructor() {
        super();
    }

    moduleExport() {
        module.exports = this.router;
    }

    loadModules() {
        super.loadModules();
        this.indexController = new IndexController();
        this.bookController = new BookController();
    }

    loadRoutes() {
        this.indexRoute();
        this.loadBooks();
    }
    async loadBooks()
    {
        this.router.get('/load-books', async (req, res) => {
            await this.indexController.updateRepository();
            res.redirect('/');
        })
    }
    async indexRoute() {
        this.router.get('/', async(req,res)=>{

            try {

                let books = await this.bookController.loadAllBooks();

                // rendering the index page as book list
                res.render('index', {
                    books : books,
                });

            } catch (e){
                console.log(e)
            }

        })
    }
}

let indexRouter = new IndexRouter();