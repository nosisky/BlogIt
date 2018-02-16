# Blog-It 
### Blog-It is a simple blogging application, it contains features like, login, register, CRUD of blog posts and comments.


For an online demo visit: [Demo](http://dealwap.herokuapp.com)



## Table of Contents

* [Features](#features)
* [Technologies](#technology)
* [Installation and Setup](#installation)
* [How to Contribute](#how-to-contribute)
* [Frequently Asked Questions](#faqs)
* [Support or New Features](#support-or-new-features)
* [License](#license)

## Features
Blog It consists of the following features:
### Authentication
- It uses JSON Web Token (JWT) for authentication.
- Token is generated on user login
- Token is perpetually verified to check the state of the user if logged in or not.
- User is assigned normal role on registration
- Admin User is pre-seeded into the application with administrative priviledges

### Normal Users
- Users can register
- Users can log in
- Users can create article
- Users can comment on article

### Admin Users
- Admin Users have all priviledges as Normal Users.
- Admin Users can log in
- Admin Users can Add, Modify & Delete Articles
- Admin Users can Add, Modify & Delete Comments

## Technology
**Blog-Its** makes use of a host of modern technologies. The core ones are:

* REACT: This project makes use of the REACT Javascript library to build the interface. REACT is used for building web pages that are structured as a collection of components. For more information about  See [this link](https://facebook.github.io/react/).
* ECMAScript 6: Also known as ES2015, this is a version of Javascript with
    next-generation features like arrow functions, generators, enhanced object literals,
    spread operators and more. The ES2015 is used in many areas of this project. See [this link](https://en.wikipedia.org/wiki/ECMAScript) for details.
* NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side.
    See [this link](https://en.wikipedia.org/wiki/Node.js) for details.
* ExressJS: ExpressJS, is a web application framework for Node.js, It is designed for building web applications and APIs.
    see [this link](https://en.wikipedia.org/wiki/Express.js).
* Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. For more information about Redux see [this link](http://redux.js.org/) for details.
* Materializecss is used to style the frontend. For more information about materializecss see [this link](http://materializecss.com/) for details.
* Webpack: Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging modules.
* Postgresql & Sequelize: Postgresql is an advanced open source Object-Relational Model (ORM) database.Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
* Major codes are written using the Airbnb javascript style guide, see [this link](https://github.com/airbnb/javascript) for details.

## Installation
> Git clone this repository

> CD to the created directory

> run ```npm install```

> run ```npm start``` to start server



> Create a `.env` file in the root directory of the application. Use a different database for your testing and development. Example of the content of a .env file looks like this. Additionally, the contentof the .env.sample file should give you an overview of what the environment variables should look like. ```


## Sample environment config
- SecretKey=mysecretkey
- MONGODB_URI=mongodb://localhost/BlogIt
- More details can be found in the .env.sample file
- run `npm start`

## API Routes
> POST : ```/api/v1/users/signup```
API routes for users to create accounts and login to the application

> POST : ```/api/v1/users/signin (username, password)```
An API route that allow users to login:

> POST : ```/api/v1/article```
An API route that allow users add new article:

> GET : ```/api/v1/articles```
An API route that allow users to get all articles in the database

> PUT : /api/v1/articles
An API route that allow  an admin user to modify article

> DELETE : ```/api/v1/articles```
An API route that allows admin to delete comments

> GET : ```/api/v1/articles/:slug```
An API route that allows user to get a single article by slug


> POST : ```/api/v1/comments```
An API route that allow users add new comment:

> PUT : /api/v1/comments
An API route that allow  an admin user to modify comment

> DELETE : ```/api/v1/comments```
An API route that allows admin to delete comments



## How to Contribute
Contributions to this project are welcomed, If you need to contribute to this project, kindly take steps below
* **Fork** the repository
* Follow [Installation and Setup](#installation) as explained earlier
* Create a branch off **master** for the feature you wish to add
* Make neccessary changes, commit and raise a pull request against develop
**Note** when making contributions, please endevour to follow the [Airbnb](https://github.com/airbnb/javascript) javascript style guide. check out the [wiki](https://github.com/nosisky/blogIt/wiki)

## License
This project is authored by **Abdulrasaq Nasirudeen** (nosisky@gmail.com) and is licensed for your use, modification and distribution under the **MIT** license.
[MIT][license]
<!-- Definitions -->
[license]: LICENSE
[author]: Abdulrasaq Nasirudeen

### FAQs
For more details contact nosisky@gmail.com

### Support or New Features
Having new features you feel I can add to HelloBooks? Kindly contact as above, I'll look into it. Thanks.
