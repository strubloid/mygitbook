class BaseRouter {

    constructor() {
        try
        {
            if(process.env.NODE_ENV !== 'production'){
                require('dotenv'). config()
            }

            this.loadModules();
            this.loadRoutes();
            this.moduleExport();

        } finally {

        }
    }

    /**
     * Basic modules to load for a router
     */
    loadModules(){
        this.express = require('express');
        this.router = this.express.Router();
        this.fetch = require("node-fetch");
    }

    loadRoutes() {
        throw new Error('You must implement this method ' + this );
    }

    moduleExport() {
        throw new Error('You must implement this method ' + this );
    }


}
module.exports = BaseRouter;
