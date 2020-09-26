# MyGitbook
This project its a sample for showing how is possible to create an API with NodeJs & Github.
Basically Its a project that contains:

| Type             | Value            |
|:-----------------|:-----------------|
| Application      | NodeJs           |
| Server           | Express          |
| Frontend         | EJS (Typescript) |
| Live Environment | Heroku           |

## How this works?
* All routers must implement the interface BaseRouter
* So we have a rule to load the data for each page, but in the index page will load all books on IndexRouter.js
* We have IndexController being the first point into this project, it will import

> This is a test project that is mainly a way to show
my books that i will be building by adding new markdown files
under a book project


## Project Structure
* Chapter: This will be object that will contain a chapter text
* Book: This will be the book that will be attached Chapters

### Chapter
* Number
* Title
* Content

### Book
* Id
* Name
* Chapter
 