const express = require('express')
const router = express.Router()

// Loading the chapter model
const Chapter = require('../models/chapterModel')
const Book = require('../models/bookModel')

/**
 * This will handle:
 *  -> everything that will be on chapters/[params]
 *  -> This will handle the search action
 */
router.get('/', async (req, res) => {

    let searchOptions = {}

    if (req.query.title != null && req.query.title !== '') {
        searchOptions.title = new RegExp(req.query.title, 'i')
    }
    if (req.query.updateDate != null && req.query.updateDate !== '') {
        searchOptions.updateDate = new RegExp(req.query.updateDate, 'i')
    }
    if (req.query.markdown != null && req.query.markdown !== '') {
        searchOptions.markdown = new RegExp(req.query.markdown, 'i')
    }
    console.log(searchOptions)
    try {
        const chapters = await Chapter.find(searchOptions)
        res.render('chapters/index', {
            chapters: chapters,
            searchOptions: req.query
        })
    } catch (e) {
        console.log(e.message)
        res.redirect('/')
    }
})

async function renderNewChapter(res, chapter, hasError = false) {
    try {
        const books = await Book.find({})
        const params = {
            books: books,
            chapter: chapter
        }

        if (hasError) {
            params.error = 'Error creating a new chapter'
        }

        res.render('chapters/new', params)

    } catch (error) {
        res.redirect('/chapters')
    }
}

// Handling chapters/new action
router.get('/new', async (req, res) => {
    renderNewChapter(res, new Chapter({}))
})

// Creating a  new chapter
router.post('/', async (req, res) => {

    const chapter = new Chapter({
        title: req.body.title,
        markdown: req.body.markdown,
        updateDate: new Date(req.body.updateDate),
        book: req.body.book,
    })

    try {
        const newChapter = await chapter.save()
        // res.redirect(`chapters/${newChapter.id}`)
        res.redirect(`chapters`)
    } catch (error) {
        renderNewChapter(res, chapter, true)
    }
})

module.exports = router