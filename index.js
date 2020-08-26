if(process.env.NODE_ENV !== 'production'){
    require('dotenv'). config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// loading routes
const indexRouter = require('./routers/indexRouter')
// const booksRouter = require('./routers/booksRouter')
// const chaptersRouter = require('./routers/chaptersRouter')

// setting the view engine as ejs
app.set('view engine', 'ejs')

// set the views folder
app.set('views', __dirname + '/views')

// set the layout folder + set to use it
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

// where will be the public files
app.use(express.static('public'))

// setting objects to use with body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended : false
}))

// app.use(bodyParser.json());

// loading the library for mongo-db + connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', error => console.log('connected to mongoose database'))

// setting to use the routers
app.use('/', indexRouter)
// app.use('/books', booksRouter)
// app.use('/chapters', booksRouter)

// getting the port by the server or the current 80 (for localhost)
app.listen(process.env.PORT || 80)
