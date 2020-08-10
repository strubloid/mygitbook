const express = require('express')
const router = express.Router()

// Loading the book model
const Book = require('../models/bookModel')

/**
 * This will handle:
 *  -> everything that will be on books/[params]
 *  -> This will handle the search action
 */
router.get('/', async (req, res) => {
    let searchOptions = {}

    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const books = await Book.find(searchOptions)
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    } catch (e) {
        console.log(e.message)
        res.redirect('/')
    }
})

// Handling books/new action
router.get('/new', (req, res) => {
    res.render('books/new', {
        book : new Book()
    })
})

// Creating a  new book
router.post('/', async (req, res) => {
    const book = new Book({
        name : req.body.name
    })

    try {
        const newBook = await book.save()
        // res.redirect(`books/${newBook.id}`)
        res.redirect(`books`)
    } catch (error) {
        res.render('books/new', {
            book : book,
            // errorMessage : error.message
            errorMessage : 'Issue with creation of an Book, try again later.'
        })
    }
})

module.exports = router