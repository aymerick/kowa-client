# kowa client [![Build Status](https://secure.travis-ci.org/aymerick/kowa-client.svg?branch=master)](http://travis-ci.org/aymerick/kowa-client) [![Code Climate](https://codeclimate.com/github/aymerick/kowa-client.svg)](https://codeclimate.com/github/aymerick/kowa-client)

Admin web app for kowa, the static website manager.

**WARNING: This is a work in progress, tests are missing, documentation is missing... a lot of stuff is missing, and it has NOT been deployed in production yet.**

This is an Ember.js application that communicates with a server written in Go that you can find at <https://github.com/aymerick/kowa>.

See <https://github.com/aymerick/kowa> for more informations.


## Development setup

### Server

Follow instructions at: <https://github.com/aymerick/kowa>


### Client

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

Install dependencies:

    $ ember install

Start client:

    $ ember server --proxy http://127.0.0.1:35830

The admin app is now running at <http://127.0.0.1:4200> and you can login with credentials: `mike` / `pizzaword`.

If you want to disable live reload (when testing image upload for example), use `--live-reload`:

    $ ember server --proxy http://127.0.0.1:35830 --live-reload=false


## Development workflow

When you change client code, the app is rebuilt automatically, and the browser reloads it (unless `--live-reload=false` flag is set).


## Test

To launch tests:

    $ ember test

Continous testing with [testem](https://github.com/airportyh/testem):

    $ ember test -s


## Production

Generate production distribution with:

    $ ember build --environment=production


## Sublime Text

Search Where: -*/bower_components/*,-*/node_modules/*,-*/dist/*,-*/tmp/*,-*.min.js,-*.min.css,-*.css.map,-*.min.map,-*.svg
