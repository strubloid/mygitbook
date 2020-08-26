const GithubModel = require('../models/GithubModel');
const BookModel = require('../models/BookModel');
const ChapterModel = require('../models/ChapterModel');

class IndexController {

    // This will construct this controllers class
    constructor() {
        this.collection = [];
        this.githubModel = new GithubModel();
    }

    /**
     * This action will be going though all books and respective
     * chapters, storing into the database.
     *
     * @returns {Promise<void>}
     */
    async updateRepository() {

        // loading book collection
        var booksOnGithub = await this.githubModel.getAllBooks();

        for ( const githubBook of booksOnGithub )  {
            try
            {
                let bookId = 0;
                const databaseBook = await BookModel.findOne({
                    'name' : githubBook.name
                });

                // this will create or just load the book ID
                if(databaseBook === null)
                {
                    const databaseBook = new BookModel({
                        name: githubBook.name,
                        github: githubBook.url
                    });
                    const newBook = await databaseBook.save();
                    bookId = newBook.id;
                } else {
                    // TODO: implement the update method
                    bookId = databaseBook.id;
                }

                // fetch book chapters on github
                var chapterOnGithub = await this.githubModel.getChapter(githubBook.url);

                if (chapterOnGithub.length){

                    for ( const githubChapter of chapterOnGithub )  {

                        const databaseChapter = await ChapterModel.findOne({
                            'name' : githubChapter.name
                        });

                        // this will try to create a new chapter if doesn't exist
                        if(databaseChapter === null) {

                            const content = await this.githubModel.fetchChapterContent(githubChapter.download_url);

                            const databaseChapter = new ChapterModel({
                                name : githubChapter.name,
                                content : content,
                                book : bookId
                            });
                            await databaseChapter.save();
                        } else {

                            // TODO: implement the update method
                            a =1;
                        }
                    }
                }


            } catch (e){
                console.log(e)
            }
        }
    }

}

module.exports = IndexController;