# eco-server

[![Author](https://img.shields.io/badge/author-Victor-158A00?style=flat-square)](https://github.com/victorskg)

> Back-end code for the Ecoleta project, featured by Next Level Week. Made with NodeJS, Express, KnexJS &amp; SQLite. :recycle:

This repository is my first contact with JavaScript on the back end, i have always worked with Java, and i was surprised by the simplicity that `express` provides to create a `RESTFULL API`.

# :pushpin: Contents

* [Features](#rocket-features)
* [Getting Started](#runner-getting-started)
* [Technologies](#postbox-technologies)
* [License](#closed_book-license)

# :rocket: Features
The serve provides some API's to be consumed by the [web](https://github.com/victorskg/eco-web) and [mobile](https://github.com/victorskg/eco-app) layer. That's API's are described bellow:

* **GET** */items* Find all collect items
* **GET** */points* Find all collect points
  - *QueryParams* city, uf and items. If none are specified, return all points. Usage example: */points?city=Fortaleza&uf=CE&items=1,2,3*
* **GET** */points:id* Find point by id
* **POST** */points* Create a point. Post a form data with the attributes of a point
* **GET** */uploads* Endpoint to provide static image files

# :runner: Getting Started
To run this server, install node and inside the server directory, do:
* Run `npm install` to install the dependencies.
* Run `npm start` and go to `http://localhost:3333`.

# :postbox: Technologies
* [Nodejs](https://nodejs.org/en/): A JavaScript runtime platform.
* [express](https://expressjs.com/): A framework to create API's.
* [KnexJS](http://knexjs.org/): A SQL builder to connect and query many of databases. Just create a `knexfile` and you should be able to connect a database, migrate versions and `populate` at app startup with the `seeds`.
* [celebrate](https://github.com/arb/celebrate): Express middleware function that wraps the joi validation library.
* [multer](https://github.com/expressjs/multer): Node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

# :closed_book: License

Released in 2020, featured by Next Level Week #1.
