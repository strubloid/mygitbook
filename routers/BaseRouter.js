let BookController = require('../controllers/BookController');

class BaseRouter {

    constructor() {
        try {
            if (process.env.NODE_ENV !== 'production') {
                require('dotenv').config()
            }

            this.loadModules();
            this.loadGeneralRoute();
            this.loadRoutes();
            this.moduleExport();

        } finally {

        }
    }

    /**
     * Basic modules to load for a router
     */
    loadModules() {
        this.express = require('express');
        this.router = this.express.Router();
        this.fetch = require("node-fetch");
    }

    /**
     * This is reserved to global variables.
     */
    loadGeneralRoute() {
        this.router.get('*', async (req, res, next) => {
            try {

                // await this.indexController.updateRepository();

                let locals = {};

                let bookController = new BookController();
                locals.allbooks = await bookController.loadAllBooks();

                // this will set on the globals list of variables
                res.locals = locals;

                // this will make continue to the other's routers
                next();

            } catch (e) {
                console.log(e)
            }
        })
    }

    loadRoutes() {
        throw new Error('You must implement this method ' + this );
    }

    moduleExport() {
        throw new Error('You must implement this method ' + this );
    }


}

module.exports = BaseRouter;
