# WatchThis!

On my journey to learn serverless framework and React.js. Ive decided to combine both into this project.

WatchThis! is a responsive [ReactJS](http://facebook.github.io/react/index.html) app that expands the functionality of [TMDb Movie Search](https://github.com/SKempin/reactjs-tmdb-app) app

It uses the [Serverless REST API](https://github.com/mouryam/watchthis-app-api) I built which makes use of AWS Platform (Lambda & API Gateway). This allows to not only have user identities but also able to store favorite movies and have a list.


![](https://github.com/mouryam/WatchThis/blob/master/app/images/watchthis_gif.gif)

## Demo
[WatchThis! - DEMO](http://d2mzx2ye3446ua.cloudfront.net/)

          User/Password (for the lazy): 
          test/test123
UPDATE: Keep encountering the following 500 POST response: {"status":false} for certain movies trying to be added into the list. With the following response header: x-cache:Error from cloudfront

If anyone has any idea email me!
          
## Tools
Key tools used in this ReactJS project are:

* [ReactJS](http://facebook.github.io/react/index.html)
* [React Router](https://reacttraining.com/react-router/)
* [Typeahead.js](https://twitter.github.io/typeahead.js/)
* [Bloodhound](https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [Bootstrap](http://getbootstrap.com/)
* [SASS](http://sass-lang.com/)
* [Browserify](http://browserify.org/)
* [Babel](https://babeljs.io/)
* [Gulp](http://gulpjs.com/)

## Installation
[node.js](http://nodejs.org/download/) is required to get ``npm``.

If you would like to download the code and try it for yourself:

1. Clone the repo: `git@github.com:mouryam/WatchThis.git`
2. `cd WatchThis`
2. Install packages: `npm install` and `bower install`
3. Build project and launch: `gulp watch`
4. Open your browser at: `http://localhost:9000`

## Node.js
Supports LTS version (v6).

## Author
[Mourya Meda](https://github.com/mouryam)
