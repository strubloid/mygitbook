let BaseRouter = require('./BaseRouter');
let BookController = require('../controllers/BookController')
let IndexController = require('../controllers/IndexController')

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
    }

    async indexRoute() {
        this.router.get('/', async(req,res)=>{

            try {

                // await this.indexController.updateRepository();

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