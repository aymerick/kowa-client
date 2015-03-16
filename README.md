kowa client
===========

Static website manager.

**WARNING: This is a work in progress, tests are missing, documentation is missing... a lot of stuff is missing, and it has NOT been deployed in production yet.**

See <https://github.com/aymerick/kowa> for more informations.


## Development setup

### Server

Follow instructions at: <https://github.com/aymerick/kowa>


### Client

Start client:

    $ ember server --proxy http://127.0.0.1:35830

The admin app is now running at <http://127.0.0.1:4200> and you can login with credentials: `mike` / `pizzaword`.

If you want to disable live reload (when testing image upload for example), set the `--live-reload`:

    $ ember server --proxy http://127.0.0.1:35830 --live-reload=false


## Development workflow

When you change client code, the app is rebuilt automatically, and the browser reloads it (unless `--live-reload=false` flag is set).


## Test

To launch tests:

    $ ember test


## Sublime Text

Search Where: -*/bower_components/*,-*/node_modules/*,-*/dist/*,-*/tmp/*,-*.min.js,-*.min.css,-*.css.map,-*.min.map,-*.svg
