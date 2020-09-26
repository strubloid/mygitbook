class Server {

    constructor() {

        if(process.env.NODE_ENV !== 'production'){
            require('dotenv'). config()
        }
        this.loadModules();
        this.setupFrontend();
        this.loadRouters();
        this.setupDatabase()
        this.app.listen(process.env.PORT || 80)
    }

    loadModules() {

        this.express = require('express');
        this.app = this.express();
        this.expressLayouts = require('express-ejs-layouts');
        this.bodyParser = require('body-parser');
        this.methodOverride = require('method-override');
        this.mongoose = require('mongoose');

        // loading routers
        this.indexRouter = require('./routers/IndexRouter');
        this.bookRouter = require('./routers/BookRouter');
    }

    loadRouters() {
        // turning on routers
        this.app.use('/', this.indexRouter);
        this.app.use('/book/', this.bookRouter);
    }

    setupFrontend() {

        this.app.set('view engine', 'ejs');          // setting the view engine as ejs
        this.app.set('views', __dirname + '/views'); // set the views folder
        this.app.set('layout', 'layouts/layout');    // set the layout folder + set to use it
        this.app.use(this.expressLayouts);
        this.app.use(this.express.static('public')); // where will be the public files

        // setting objects to use with body-parser
        this.app.use(this.bodyParser.urlencoded({
            limit: '10mb',
            extended : false
        }));

        // parse requests of content-type - application/json
        this.app.use(this.bodyParser.json());
    }

    setupDatabase() {

        // loading the library for mongo-db + connection

        this.mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser : true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        this.db = this.mongoose.connection;
        this.db.on('error', error => console.error(error));
        this.db.once('open', error => console.log('connected to mongoose database'));

    }
}

var server = new Server();