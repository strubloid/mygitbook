class GithubModel {

    constructor() {

        this.githubClientId = process.env.GITHUB_CLIENT_ID;
        this.githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
        this.fetch = require("node-fetch");
        this.repositoryUrl = 'https://api.github.com/repos/strubloid/testbook/contents';
    }

    /**
     * Generation of a call for the Book API
     * @param path
     * @returns {string}
     */
    buildFetchCall(path = this.repositoryUrl)
    {
        var url = new URL(path);
        url.searchParams.set('client_id', this.githubClientId);
        url.searchParams.set('client_secret', this.githubClientSecret);

        return url.toString();
    }

    /**
     * Function that will return a call for the main repo on github
     * @returns {Promise<any>}
     */
    async getAllBooks()
    {
        const fetchString = this.buildFetchCall();
        return await this.githubFetch(fetchString);
    }

    /**
     * This will fetch information about a book.
     * @param bookFetchString
     * @returns {Promise<any>}
     */
    async getBook(bookFetchString)
    {
        return this.githubFetch(bookFetchString)
    }

    /**
     * This will fetch what is a chapter in the github structure.
     *
     * @param bookFetchString
     * @returns {Promise<any>}
     */
    async getChapter(bookFetchString)
    {
        return this.githubFetch(bookFetchString)
    }

    /**
     * Loading the chapter information.
     *
     * @param chapterFetchString
     * @returns {Promise<*>}
     */
    async fetchChapterContent(chapterFetchString)
    {
        const response = await this.fetch(this.buildFetchCall(chapterFetchString));
        const markdown = await response.text();
        return markdown;
    }

    /**
     * Github fetch command.
     *
     * @param stringToFetch
     * @returns {Promise<any>}
     */
    async githubFetch(stringToFetch) {
        const response = await this.fetch(this.buildFetchCall(stringToFetch));
        const json = await response.json();
        return json;
    }

}

module.exports = GithubModel;